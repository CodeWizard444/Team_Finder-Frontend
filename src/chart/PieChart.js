// PieChart.js
import React, { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import "./style.css";
import chartData from "../data/chartData";

export default function PieChart() {
  const [skillStats, setSkillStats] = useState({});

  useEffect(() => {
    const generateSkillStats = () => {
      const stats = {};
      chartData.forEach((employee) => {
        if (employee.department) {
          employee.skills.forEach((skill) => {
            if (!stats[skill.name]) {
              stats[skill.name] = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
            }
            if (skill.level <= 5) {
              stats[skill.name][skill.level]++;
            }
          });
        }
      });
      setSkillStats(stats);
    };

    generateSkillStats();
  }, []);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");

    const labels = Object.keys(skillStats);
    const data = Object.values(skillStats).map((stats) => Object.values(stats));
    

    chartInstance.current = new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Level 1",
            data: data.map((stats) => stats[1]),
            backgroundColor: "#090947"
          },
          {
            label: "Level 2",
            data: data.map((stats) => stats[2]),
            backgroundColor: "rgb(207, 211, 236)"
          },
          {
            label: "Level 3",
            data: data.map((stats) => stats[3]),
            backgroundColor: "rgb(2, 27, 121)"
          },
          {
            label: "Level 4",
            data: data.map((stats) => stats[4]),
            backgroundColor: "#c3cfe2"
          },
          {
            label: "Level 5",
            data: data.map((stats) => stats[5]),
            backgroundColor: "rgb(120, 201, 244)"
          }
        ]
      },
      options: {
        scales: {
          x: { stacked: true },
          y: { stacked: true }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [skillStats]);

  return (
    <div className="chart-container">
      <canvas ref={chartRef} />
    </div>
  );
}
