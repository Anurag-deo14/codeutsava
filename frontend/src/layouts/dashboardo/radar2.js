import React, { useState } from "react";
import "./Chart.css";
import ReactApexChart from "react-apexcharts";

const Chart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Production",
        data: [23, 34, 55, 70, 49, 68, 75, 81],
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
        Update Cost of supply Data
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
