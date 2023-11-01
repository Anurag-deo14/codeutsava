from flask import Flask, request, jsonify, send_from_directory,send_file, render_template
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

app = Flask(__name__)
CORS(app)

@app.route('/optimize', methods=['GET'])
def optimize_supply_chain():
    

    """## Importing the datasets:"""

    

    freight_costs = pd.read_excel("freight_costs.xlsx", index_col = 0)
    var_costs = pd.read_excel("variable_costs.xlsx", index_col = 0)
    stor_costs = pd.read_excel("Storage_costs.xlsx", index_col = 0)


    carb_emissions = pd.read_excel("CO2_Emissions.xlsx", index_col = 0)


    lead_time = pd.read_excel("Delivery_LeadTime.xlsx", index_col = 0)

    total_costs = freight_costs/1000 + var_costs

    fixed_costs = pd.read_excel("fixed_cost.xlsx", index_col = 0)

    total_fixed = fixed_costs + stor_costs

    delivery_times = pd.read_excel("Delivery_LeadTime.xlsx", index_col = 0)


    cap = pd.read_excel("capacity.xlsx", index_col = 0)


    demand = pd.read_excel("demand.xlsx", index_col = 0)


    Co2_dict = {'Delhi':10000000000,'Chennai':10000000000,'Mumbai':10000000000,'Nagpur':10000000000,'Raipur':10000000000}

    Co2_Limits  = pd.DataFrame(Co2_dict.items(), columns = ['City', 'Max CO2 permitted (in kgs)'], )
    Co2_Limits.set_index('City')

    del_deadline = pd.read_excel("Delivery_Deadlines.xlsx", index_col = 0)


    """## Building the linear programming model from Pulp Library:"""

    # Define Decision Variables through a list
    loc = ['Delhi', 'Chennai', 'Mumbai', 'Nagpur', 'Raipur']
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
        model += lpSum([x[(i, j)] for i in loc]) == demand.loc[j,'Demand']
    for i in loc:
        model += lpSum([x[(i, j)] for j in loc]) <= lpSum([cap.loc[i,s]*y[(i,s)] * 1000 for s in size])
    for j in loc:
        model += lpSum([carb_emissions.loc[i,j] * x[(i,j)] for i in loc]) <= [5000000000,5000000000,5000000000,5000000000,5000000000]

    model += lpSum([delivery_times.loc[i,j] * z[(i,j)] for i in loc for j in loc]) <= (del_deadline.loc[i,j] for i in loc for j in loc)


        # Define logical constraint: Add a logical constraint so that if the high capacity plant in Delhi is open, then a low capacity plant in Chennai is also opened.
    # model += y[('Delhi','High_Cap')] <= y[('Chennai','Low_Cap')]

    # Solve Model
    model.solve()
    total_money = value(model.objective)
    print("Total Costs = {:,} (₹/Month)".format(int(value(model.objective))))
    print('\n' + "Status: {}".format(LpStatus[model.status]))


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
        print(name, "=", v.varValue)

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



    Delhi_List, Chennai_List, Mumbai_List, Nagpur_List, Raipur_List = [], [], [], [], []
    for l in loc:
        for var_costs in ['Delhi', 'Chennai', 'Mumbai', 'Nagpur', 'Raipur']:
            x = "('{}','{}')".format(l, var_costs)
            if var_costs == 'Delhi':
                Delhi_List.append(dict_prod[x])
            elif var_costs == 'Chennai':
                Chennai_List.append(dict_prod[x])
            elif var_costs == 'Mumbai':
                Mumbai_List.append(dict_prod[x])
            elif var_costs == 'Nagpur':
                Nagpur_List.append(dict_prod[x])
            elif var_costs == 'Raipur':
                Raipur_List.append(dict_prod[x])

    df_production = pd.DataFrame({'Location': loc, 'Delhi': Delhi_List, 'Chennai': Chennai_List, 'Mumbai': Mumbai_List, 'Nagpur': Nagpur_List, 'Raipur': Raipur_List}).set_index('Location')



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
    nx.draw(G, pos, with_labels=True, node_size=1000, font_size=10, font_color='black', node_color='#3caea3', font_weight='bold', ax=ax)
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
