import React, { useState } from "react";
import "./Chart.css";
import ReactApexChart from "react-apexcharts";

const Chart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Production",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      xaxis: {
        categories: ["Delhi", "Mumbai", "Chennai", "Raipur", "Nagpur", "Bilaspur", "Korba", "Durg"],
      },
    },
  });

  const updateChartData = () => {
    // Generate random data for the chart
    const newData = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100));
    setChartData({
      ...chartData,
      series: [{ data: newData }],
    });
  };

  return (
    <div>
      <button onClick={updateChartData} className="update-button">
        Update Production Data
      </button>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default Chart;
