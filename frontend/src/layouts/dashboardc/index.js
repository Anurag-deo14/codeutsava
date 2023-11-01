/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import AC from "./apex";
import Radar from "./radar";
import PaymentMethod from "./PaymentMethod";
import Radar1 from "./radar1";
function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [serverData, setServerData] = useState({});

  async function fetchData() {
    try {
      // Replace 'http://localhost:5000' with your Flask server URL and route.
      const response = await axios.get("http://localhost:5000/optimize");
      console.log(response.data);
      setServerData(response.data);
    } catch (error) {
      console.error("Error fetching data from the server:", error);
    }
  }

  useEffect(() => {
    fetchData(); // Call the fetchData function when the component mounts
  }, []);
  // For Low variant
  const ChennaiLow = serverData.capacity ? serverData.capacity.Low.Chennai : 0;
  const DelhiLow = serverData.capacity ? serverData.capacity.Low.Delhi : 0;
  const NagpurLow = serverData.capacity ? serverData.capacity.Low.Nagpur : 0;
  const RaipurLow = serverData.capacity ? serverData.capacity.Low.Raipur : 0;
  const MumbaiLow = serverData.capacity ? serverData.capacity.Low.Mumbai : 0;

  // For High variant
  const ChennaiHigh = serverData.capacity ? serverData.capacity.High.Chennai : 0;
  const DelhiHigh = serverData.capacity ? serverData.capacity.High.Delhi : 0;
  const NagpurHigh = serverData.capacity ? serverData.capacity.High.Nagpur : 0;
  const RaipurHigh = serverData.capacity ? serverData.capacity.High.Raipur : 0;
  const MumbaiHigh = serverData.capacity ? serverData.capacity.High.Mumbai : 0;

  const sumL = ChennaiLow + DelhiLow + NagpurLow + RaipurLow + MumbaiLow;
  const sumH = ChennaiHigh + DelhiHigh + NagpurHigh + RaipurHigh + MumbaiHigh;
  const sumT = sumL + sumH;
  const la = Math.ceil(serverData.total ? serverData.total : 0);
  const ln = la.toLocaleString();
  const CL = serverData.plot ? serverData.plot.Low["0"] : 0;

  console.log(CL);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              {/* <ComplexStatisticsCard
                color="dark"
                icon="paid"
                title="Total Estimated Cost"
                count={ln}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              /> */}
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              {/* <ComplexStatisticsCard
                icon="south"
                title="Low Production Area"
                count={sumL}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              /> */}
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              {/* <ComplexStatisticsCard
                color="success"
                icon="north"
                title="High Production Area"
                count={sumH}
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              /> */}
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              {/* <ComplexStatisticsCard
                color="primary"
                icon="verified"
                title="Total Production Area"
                count={sumT}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              /> */}
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <AC />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <Radar />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <Radar1 />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} mt={6}>
              <PaymentMethod />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;