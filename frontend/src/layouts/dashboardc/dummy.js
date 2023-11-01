import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const ApexChart = () => {
  const [serverData, setServerData] = useState({});

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:5000/data");
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

  const CL = serverData ? serverData.A : 0;
  const DL = serverData ? serverData.B : 0;
  const NL = serverData ? serverData.C : 0;
  const RL = serverData ? serverData.D : 0;
  const ML = serverData ? serverData.E : 0;
  const CH = serverData ? serverData.F : 0;
  const DH = serverData ? serverData.G : 0;
  const NH = serverData ? serverData.H : 0;
  const RH = serverData ? serverData.I : 0;

  const series = [
    {
      name: "Demand",
      data: [CL, DL, NL, RL, ML, CH, DH, NH, RH],
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
      text: "Live Demand Data",
    },
    xaxis: {
      categories: [
        "Raipur",
        "Bilaspur",
        "Ambikapur",
        "Nagpur",
        "Bhilai",
        "Raigarh",
        "Korba",
        "Jagdalpur",
        "Chimri",
      ],
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
