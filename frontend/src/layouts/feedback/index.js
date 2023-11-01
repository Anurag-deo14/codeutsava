import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFeedback("");
    setRating(0);
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
                  Feedback Form
                </MDTypography>
                <MDTypography variant="body2" color="white" mt={2}>
                  Please share your feedback below.
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={4}>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: "flex" }}>
                    <textarea
                      id="feedback"
                      name="feedback"
                      value={feedback}
                      onChange={handleFeedbackChange}
                      placeholder="Your feedback here..."
                      style={{
                        flex: 1,
                        padding: "12px",
                        border: "1px solid #2196f3",
                        borderRadius: "4px",
                        boxSizing: "border-box",
                        fontSize: "18px",
                        lineHeight: "1.4",
                        marginBottom: "10px",
                        minHeight: "150px",
                      }}
                    ></textarea>
                  </div>
                </form>
              </MDBox>
            </Card>
          </Grid>
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
                  Service Rating
                </MDTypography>
                <MDTypography variant="body2" color="white" mt={2}>
                  Please rate our service.
                </MDTypography>
              </MDBox>
              <MDBox display="flex" justifyContent="center" pt={3}>
                {[...Array(5)].map((star, i) => {
                  const ratingValue = i + 1;
                  return (
                    <span
                      key={i}
                      style={{
                        fontSize: "48px",
                        color: ratingValue <= rating ? "#FFD700" : "#808080",
                        cursor: "pointer",
                        marginRight: "4px",
                      }}
                      onClick={() => handleRatingChange(ratingValue)}
                    >
                      ★
                    </span>
                  );
                })}
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox display="flex" justifyContent="center" pt={5}>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  style={{
                    backgroundColor: "#2196f3",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  Submit Feedback
                </button>
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
