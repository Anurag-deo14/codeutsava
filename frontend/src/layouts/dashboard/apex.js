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

  const CL = serverData.plot ? serverData.plot.Low["0"] : 0;
  const DL = serverData.plot ? serverData.plot.Low["1"] : 0;
  const NL = serverData.plot ? serverData.plot.Low["2"] : 0;
  const RL = serverData.plot ? serverData.plot.Low["3"] : 0;
  const ML = serverData.plot ? serverData.plot.Low["4"] : 0;
  const CH = serverData.plot ? serverData.plot.High["0"] : 0;
  const DH = serverData.plot ? serverData.plot.High["1"] : 0;
  const NH = serverData.plot ? serverData.plot.High["2"] : 0;
  const RH = serverData.plot ? serverData.plot.High["3"] : 0;
  const MH = serverData.plot ? serverData.plot.High["4"] : 0;
  console.log("CL:", CL);
  console.log("DL:", DL);
  console.log("NL:", NL);
  console.log("RL:", RL);
  console.log("ML:", ML);
  console.log("CH:", CH);
  console.log("DH:", DH);
  console.log("NH:", NH);
  console.log("RH:", RH);
  console.log("MH:", MH);
  const CLX = CL / 1000;
  const DLX = DL / 1000;
  const NLX = NL / 1000;
  const RLX = RL / 1000;
  const MLX = ML / 1000;
  const CHA = CH / 1000;
  const DHA = DH / 1000;
  const NHA = NH / 1000;
  const RHA = RH / 1000;
  const MHA = MH / 1000;

  const series = [
    {
      name: "Low",
      data: [CLX, DLX, NLX, RLX, MLX],
    },
    {
      name: "High",
      data: [CHA, DHA, NHA, RHA, MHA],
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
      text: "Production",
    },
    xaxis: {
      categories: ["Delhi", "Chennai", "Mumbai", "Nagpur", "Raipur"],
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
