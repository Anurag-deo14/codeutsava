import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const ApexChart = () => {
  const [serverData, setServerData] = useState({});

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:5000/optimize");
      console.log("Response data:", response.data);
      setServerData(response.data);
    } catch (error) {
      console.error("Error fetching data from the server:", error);
    }
  }

  useEffect(() => {
    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  console.log("Server data:", serverData);

  const CL = serverData.demand ? serverData.demand.Demand.Chennai : 0;
  const DL = serverData.demand ? serverData.demand.Demand.Delhi : 0;
  const NL = serverData.demand ? serverData.demand.Demand.Nagpur : 0;
  const RL = serverData.demand ? serverData.demand.Demand.Raipur : 0;
  const ML = serverData.demand ? serverData.demand.Demand.Mumbai : 0;

  console.log("CL:", CL);
  console.log("DL:", DL);
  console.log("NL:", NL);
  console.log("RL:", RL);
  console.log("ML:", ML);
  const CLX = CL / 1000;
  const DLX = DL / 1000;
  const NLX = NL / 1000;
  const RLX = RL / 1000;
  const MLX = ML / 1000;

  const series = [
    {
      name: "Demand",
      data: [CLX, DLX, NLX, RLX, MLX],
    },
  ];

  const [options] = useState({
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    title: {
      text: "Demand",
    },
    xaxis: {
      categories: ["Chennai", "Delhi", "Mumbai", "Nagpur", "Raipur"],
      labels: {
        formatter: function (val) {
          return val + "K";
        },
      },
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "K";
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: 40,
    },
  });

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default ApexChart;
