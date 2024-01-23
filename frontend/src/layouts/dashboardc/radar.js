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

  const CD = serverData.dtimes ? serverData.dtimes.Chennai.Delhi : 0;
  const DC = serverData.dtimes ? serverData.dtimes.Delhi.Chennai : 0;
  const CC = serverData.dtimes ? serverData.dtimes.Chennai.Chennai : 0;
  const CM = serverData.dtimes ? serverData.dtimes.Chennai.Mumbai : 0;
  const CN = serverData.dtimes ? serverData.dtimes.Chennai.Nagpur : 0;
  const CR = serverData.dtimes ? serverData.dtimes.Chennai.Raipur : 0;

  const DD = serverData.dtimes ? serverData.dtimes.Delhi.Delhi : 0;
  const DM = serverData.dtimes ? serverData.dtimes.Delhi.Mumbai : 0;
  const DN = serverData.dtimes ? serverData.dtimes.Delhi.Nagpur : 0;
  const DR = serverData.dtimes ? serverData.dtimes.Delhi.Raipur : 0;

  const MD = serverData.dtimes ? serverData.dtimes.Mumbai.Delhi : 0;
  const MM = serverData.dtimes ? serverData.dtimes.Mumbai.Mumbai : 0;
  const MC = serverData.dtimes ? serverData.dtimes.Mumbai.Chennai : 0;
  const MN = serverData.dtimes ? serverData.dtimes.Mumbai.Nagpur : 0;
  const MR = serverData.dtimes ? serverData.dtimes.Mumbai.Raipur : 0;

  const ND = serverData.dtimes ? serverData.dtimes.Nagpur.Delhi : 0;
  const NM = serverData.dtimes ? serverData.dtimes.Nagpur.Mumbai : 0;
  const NC = serverData.dtimes ? serverData.dtimes.Nagpur.Chennai : 0;
  const NN = serverData.dtimes ? serverData.dtimes.Nagpur.Nagpur : 0;
  const NR = serverData.dtimes ? serverData.dtimes.Nagpur.Raipur : 0;

  const RD = serverData.dtimes ? serverData.dtimes.Raipur.Delhi : 0;
  const RM = serverData.dtimes ? serverData.dtimes.Raipur.Mumbai : 0;
  const RC = serverData.dtimes ? serverData.dtimes.Raipur.Chennai : 0;
  const RN = serverData.dtimes ? serverData.dtimes.Raipur.Nagpur : 0;
  const RR = serverData.dtimes ? serverData.dtimes.Raipur.Raipur : 0;

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
      text: "Delivery Time",
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
