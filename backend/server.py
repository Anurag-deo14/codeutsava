from flask import Flask,redirect, request, jsonify, send_from_directory,send_file, render_template
import pandas as pd
from pulp import *
import os
from flask_cors import CORS
import random
import networkx as nx
import matplotlib.pyplot as plt
from matplotlib.figure import Figure
import io
import base64
from concurrent.futures import ThreadPoolExecutor
from supabase import create_client, Client
from dotenv import load_dotenv
load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

app = Flask(__name__)
CORS(app)

def fetch_supabase_data(table_name):
    data = pd.DataFrame(supabase.table(table_name).select("*").execute().data)
    data.set_index("City", inplace=True)
    data.sort_index(inplace=True)
    return data
            
@app.route('/optimize', methods=['GET'])
def optimize_supply_chain():

    tables_to_fetch = ['Transport', 'Variable', 'Storage', 'co2', 'Leadtime', 'Fixed', 'Capacity', 'Demand', 'Deadline']

    with ThreadPoolExecutor() as executor:
        results = list(executor.map(fetch_supabase_data, tables_to_fetch))

    freight_costs, var_costs, stor_costs, carb_emissions, lead_time, fixed_costs, cap, demand, del_deadline = results

    total_fixed = fixed_costs + stor_costs
    total_costs = freight_costs/1000 + var_costs
    delivery_times = lead_time  


    """## Building the linear programming model from Pulp Library:"""

    # Decision Variables 
    loc = [ 'Chennai','Delhi', 'Mumbai', 'Nagpur', 'Raipur']
    size = ['Low', 'High']

    # Initialize Class
    model = LpProblem("Capacitated Plant Location Model", LpMinimize)


    # Create Decision Variables
    x = LpVariable.dicts("production_", [(i,j) for i in loc for j in loc],
                        lowBound=0, upBound=None, cat='continuous')
    y = LpVariable.dicts("plant_",
                        [(i,s) for s in size for i in loc], cat='Binary')
    z = LpVariable.dicts("delivery_",[(i,j) for i in loc for j in loc], cat = 'Binary')

    # Define Objective Function
    model += (lpSum([total_fixed.loc[i,s] * y[(i,s)] * 1000 for s in size for i in loc])
            + lpSum([total_costs.loc[i,j] * x[(i,j)]   for i in loc for j in loc]))

    # Add Constraints
    for j in loc:
        model += lpSum([x[(i, j)] for i in loc]) == demand.loc[j].iloc[0]
    for i in loc:
        model += lpSum([x[(i, j)] for j in loc]) <= lpSum([cap.loc[i,s]*y[(i,s)] * 1000 for s in size])
    for j in loc:
        model += lpSum(carb_emissions.loc[i, j] * x[(i, j)] for i in loc for j in loc) <= 5000000000
    model += lpSum([delivery_times.loc[i,j] * z[(i,j)] for i in loc for j in loc]) <= tuple(del_deadline.loc[i,j] for i in loc for j in loc)

    # Solve Model
    model.solve()
    total_money = value(model.objective)
    print("Total Costs = {:,} (₹/Month)".format(int(value(model.objective))))
    # print('\n' + "Status: {}".format(LpStatus[model.status]))


    # Dictionary to display the output data after optimization:
    dict_plant = {}
    dict_prod = {}
    for v in model.variables():
        if 'plant' in v.name:
            name = v.name.replace('plant__', '').replace('_', '')
            dict_plant[name] = int(v.varValue)
            p_name = name
        else:
            name = v.name.replace('production__', '').replace('_', '')
            dict_prod[name] = v.varValue
        # print(name, "=", v.varValue)

    """## Converting the results of the model to dataframes:"""

    list_low, list_high = [], []
    for l in loc:
        for cap in ['Low', 'High']:
            x = "('{}','{}')".format(l, cap)
            if cap == 'Low':
                list_low.append(dict_plant[x])
            else:
                list_high.append(dict_plant[x])
    df_capacity = pd.DataFrame({'Location': loc, 'Low': list_low, 'High': list_high}).set_index('Location')

    Chennai_List,Delhi_List, Mumbai_List, Nagpur_List, Raipur_List = [], [], [], [], []
    for l in loc:
        for var_costs in ['Chennai','Delhi',  'Mumbai', 'Nagpur', 'Raipur']:
            x = "('{}','{}')".format(l, var_costs)
            if var_costs == 'Chennai':
                Chennai_List.append(dict_prod[x])
            elif var_costs == 'Delhi':
                Delhi_List.append(dict_prod[x])
            elif var_costs == 'Mumbai':
                Mumbai_List.append(dict_prod[x])
            elif var_costs == 'Nagpur':
                Nagpur_List.append(dict_prod[x])
            elif var_costs == 'Raipur':
                Raipur_List.append(dict_prod[x])

    df_production = pd.DataFrame({'Location': loc, 'Chennai': Chennai_List,'Delhi': Delhi_List,  'Mumbai': Mumbai_List, 'Nagpur': Nagpur_List, 'Raipur': Raipur_List}).set_index('Location')

    df_production["Sum"] = df_production.sum(axis=1)

    sum_list = df_production['Sum']


    low_prod, high_prod = [], []
    for i,j,k in zip(list_low, list_high, sum_list):
        if i ==0 and j==1:
            high_prod.append(k)
            low_prod.append(0)
        elif i==1 and j==0:
            low_prod.append(k)
            high_prod.append(0)
        elif i==1 and j==1:
            low_prod.append(500000)
            high_prod.append(k-500000)
        else:
            low_prod.append(0)
            high_prod.append(0)
    df_plot = pd.DataFrame({'Location': loc, 'Low': low_prod, 'High': high_prod})
 
    results = {
        "tcost" : total_costs.to_dict(),
        "dtimes" : delivery_times.to_dict(),
        "demand" : demand.to_dict(),
        "capacity": df_capacity.to_dict(),
        "production": df_production.to_dict(),
        "plot": df_plot.to_dict(),
        "total": total_money
        }

    return jsonify(results)


@app.route('/data', methods=['GET'])
def get_city_data():
    # Generate random values for cities A to I
    city_data = {}
    for city_name in ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']:
        random_value = random.randint(25, 100)
        city_data[city_name] = random_value

    return jsonify(city_data)



def create_random_graph():
    G = nx.Graph()
    for i in range(20):
        for j in range(i + 1, 20):
            if random.random() < 0.3:
                weight = random.randint(1, 10)
                G.add_edge(i, j, weight=weight)
    return G

# Global variable to store the graph
graph = create_random_graph()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/monthly_demand', methods=['GET', 'POST'])
def monthly_demand():
    if request.method == 'GET':
        data = supabase.table('Demand').select('*').execute().data
        return render_template('monthly_demand_template.html', data=data)

    elif request.method == 'POST':
        cityname = request.form.get('cityname')
        new_demand = request.form.get('demand')

        supabase.table('Demand').upsert({'City': cityname,'Demand': new_demand}).execute()  # Pass a single object as the first argument

        return redirect('/monthly_demand')

@app.route('/shortest_path', methods=['POST'])
def shortest_path():
    start_node = int(request.form.get('start_node'))
    end_node = int(request.form.get('end_node'))
    
    shortest_path = nx.shortest_path(graph, source=start_node, target=end_node)
    return jsonify({'shortest_path': shortest_path})
def generate_graph_image(G):
    pos = nx.spring_layout(G)  # You can choose a layout algorithm that suits your graph
    labels = nx.get_edge_attributes(G, 'weight')
    edge_labels = {k: v for k, v in labels.items()}
    
    fig, ax = plt.subplots(figsize=(10, 10))
    nx.draw(G, pos, with_labels=True, node_size=1000, font_size=10, font_color='black', node_color='#3C95EF', font_weight='bold', ax=ax)
    nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels, ax=ax)

    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    plt.close()
    
    return base64.b64encode(buf.getvalue()).decode('utf-8')
@app.route('/generate_graph', methods=['GET'])
def generate_graph():
    image_data = generate_graph_image(graph)
    return jsonify({'graph': image_data})

if __name__ == '__main__':
    app.run(debug=True)
