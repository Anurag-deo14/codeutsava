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

  const CD = serverData.tcost ? serverData.tcost.Chennai.Delhi : 0;
  const DC = serverData.tcost ? serverData.tcost.Delhi.Chennai : 0;
  const CC = serverData.tcost ? serverData.tcost.Chennai.Chennai : 0;
  const CM = serverData.tcost ? serverData.tcost.Chennai.Mumbai : 0;
  const CN = serverData.tcost ? serverData.tcost.Chennai.Nagpur : 0;
  const CR = serverData.tcost ? serverData.tcost.Chennai.Raipur : 0;

  const DD = serverData.tcost ? serverData.tcost.Delhi.Delhi : 0;
  const DM = serverData.tcost ? serverData.tcost.Delhi.Mumbai : 0;
  const DN = serverData.tcost ? serverData.tcost.Delhi.Nagpur : 0;
  const DR = serverData.tcost ? serverData.tcost.Delhi.Raipur : 0;

  const MD = serverData.tcost ? serverData.tcost.Mumbai.Delhi : 0;
  const MM = serverData.tcost ? serverData.tcost.Mumbai.Mumbai : 0;
  const MC = serverData.tcost ? serverData.tcost.Mumbai.Chennai : 0;
  const MN = serverData.tcost ? serverData.tcost.Mumbai.Nagpur : 0;
  const MR = serverData.tcost ? serverData.tcost.Mumbai.Raipur : 0;

  const ND = serverData.tcost ? serverData.tcost.Nagpur.Delhi : 0;
  const NM = serverData.tcost ? serverData.tcost.Nagpur.Mumbai : 0;
  const NC = serverData.tcost ? serverData.tcost.Nagpur.Chennai : 0;
  const NN = serverData.tcost ? serverData.tcost.Nagpur.Nagpur : 0;
  const NR = serverData.tcost ? serverData.tcost.Nagpur.Raipur : 0;

  const RD = serverData.tcost ? serverData.tcost.Raipur.Delhi : 0;
  const RM = serverData.tcost ? serverData.tcost.Raipur.Mumbai : 0;
  const RC = serverData.tcost ? serverData.tcost.Raipur.Chennai : 0;
  const RN = serverData.tcost ? serverData.tcost.Raipur.Nagpur : 0;
  const RR = serverData.tcost ? serverData.tcost.Raipur.Raipur : 0;

  const series = [
    {
      name: "Delhi",
      data: [DD, DC, DM, DN, DR],
    },
    {
      name: "Chennai",
      data: [CD, CC, CM, CN, CR],
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
      text: "Delivery Cost",
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
