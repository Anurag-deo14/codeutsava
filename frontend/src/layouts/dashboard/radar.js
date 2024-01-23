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

  const CD = serverData.production ? serverData.production.Chennai.Delhi / 10000 : 0;
  const DC = serverData.production ? serverData.production.Delhi.Chennai / 10000 : 0;
  const CC = serverData.production ? serverData.production.Chennai.Chennai / 10000 : 0;
  const CM = serverData.production ? serverData.production.Chennai.Mumbai / 10000 : 0;
  const CN = serverData.production ? serverData.production.Chennai.Nagpur / 10000 : 0;
  const CR = serverData.production ? serverData.production.Chennai.Raipur / 10000 : 0;

  const DD = serverData.production ? serverData.production.Delhi.Delhi / 10000 : 0;
  const DM = serverData.production ? serverData.production.Delhi.Mumbai / 10000 : 0;
  const DN = serverData.production ? serverData.production.Delhi.Nagpur / 10000 : 0;
  const DR = serverData.production ? serverData.production.Delhi.Raipur / 10000 : 0;

  const MD = serverData.production ? serverData.production.Mumbai.Delhi / 10000 : 0;
  const MM = serverData.production ? serverData.production.Mumbai.Mumbai / 10000 : 0;
  const MC = serverData.production ? serverData.production.Mumbai.Chennai / 10000 : 0;
  const MN = serverData.production ? serverData.production.Mumbai.Nagpur / 10000 : 0;
  const MR = serverData.production ? serverData.production.Mumbai.Raipur / 10000 : 0;

  const ND = serverData.production ? serverData.production.Nagpur.Delhi / 10000 : 0;
  const NM = serverData.production ? serverData.production.Nagpur.Mumbai / 10000 : 0;
  const NC = serverData.production ? serverData.production.Nagpur.Chennai / 10000 : 0;
  const NN = serverData.production ? serverData.production.Nagpur.Nagpur / 10000 : 0;
  const NR = serverData.production ? serverData.production.Nagpur.Raipur / 10000 : 0;

  const RD = serverData.production ? serverData.production.Raipur.Delhi / 10000 : 0;
  const RM = serverData.production ? serverData.production.Raipur.Mumbai / 10000 : 0;
  const RC = serverData.production ? serverData.production.Raipur.Chennai / 10000 : 0;
  const RN = serverData.production ? serverData.production.Raipur.Nagpur / 10000 : 0;
  const RR = serverData.production ? serverData.production.Raipur.Raipur / 10000 : 0;

  const series = [
    {
      name: "Chennai",
      data: [CD, CC, CM, CN, CR],
    },
    {
      name: "Delhi",
      data: [DD, DC, DM, DN, DR],
    },
    {
      name: "Mumbai",
      data: [MD, MC, MM, MN, MR],
    },
    {
      name: "Nagpur",
      data: [ND, NC, NM, NN, NR],
    },
    {
      name: "Raipur",
      data: [RD, RC, RM, RN, RR],
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "radar",
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1,
      },
    },
    title: {
      text: "Consumption Export Chart",
    },
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.1,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      categories: ["Chennai", "Delhi", "Mumbai", "Nagpur", "Raipur"],
    },
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="radar" height={350} />
    </div>
  );
};

export default ApexChart;
