import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

const inputStyle = {
  flex: 1,
  padding: "12px",
  border: "1px solid #2196f3",
  borderRadius: "4px",
  boxSizing: "border-box",
  fontSize: "18px",
  lineHeight: "1.4",
  marginBottom: "10px",
  minHeight: "150px",
};

const buttonStyle = {
  backgroundColor: "#2196f3",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
};

const Feedback = () => {
  const [highYield, setHighYield] = useState("");
  const [lowYield, setLowYield] = useState("");
  const [production, setProduction] = useState("");
  const [demand, setDemand] = useState("");
  const [delayInDelivery, setDelayInDelivery] = useState("");
  const [traffic, setTraffic] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can access the values of highYield, lowYield, production, demand, delayInDelivery, and traffic
    // Do something with the values (e.g., submit them to the server)
    console.log("High Yield:", highYield);
    console.log("Low Yield:", lowYield);
    console.log("Production:", production);
    console.log("Demand:", demand);
    console.log("Delay in Delivery:", delayInDelivery);
    console.log("Traffic:", traffic);

    // Reset the input fields
    setHighYield("");
    setLowYield("");
    setProduction("");
    setDemand("");
    setDelayInDelivery("");
    setTraffic("");

    setFormSubmitted(true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={20}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Update Production
                </MDTypography>
                <MDTypography variant="body2" color="white" mt={2}>
                  Please share your data below.
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={4}>
                <form onSubmit={handleSubmit}>
                  <div>
                    <textarea
                      id="highYield"
                      name="highYield"
                      value={highYield}
                      onChange={(e) => setHighYield(e.target.value)}
                      placeholder="High Yield"
                      style={inputStyle}
                    />
                    <textarea
                      id="lowYield"
                      name="lowYield"
                      value={lowYield}
                      onChange={(e) => setLowYield(e.target.value)}
                      placeholder="Low Yield"
                      style={inputStyle}
                    />
                    <textarea
                      id="production"
                      name="production"
                      value={production}
                      onChange={(e) => setProduction(e.target.value)}
                      placeholder="Production"
                      style={inputStyle}
                    />
                    <textarea
                      id="demand"
                      name="demand"
                      value={demand}
                      onChange={(e) => setDemand(e.target.value)}
                      placeholder="Demand"
                      style={inputStyle}
                    />
                    <textarea
                      id="delayInDelivery"
                      name="delayInDelivery"
                      value={delayInDelivery}
                      onChange={(e) => setDelayInDelivery(e.target.value)}
                      placeholder="Delay in Delivery"
                      style={inputStyle}
                    />
                    <textarea
                      id="traffic"
                      name="traffic"
                      value={traffic}
                      onChange={(e) => setTraffic(e.target.value)}
                      placeholder="Traffic"
                      style={inputStyle}
                    />
                  </div>
                  <button type="submit" style={buttonStyle}>
                    Update
                  </button>
                </form>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer style={{ position: "fixed", bottom: 0, width: "100%" }} />
    </DashboardLayout>
  );
};

export default Feedback;
