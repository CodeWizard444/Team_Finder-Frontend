import React, { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import "./stats.css";
import chartData from "../data/chartData";

export default function ChartStats() {
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
    const totalEmployees = chartData.length;
    const data = Object.values(skillStats).map((stats) => {
      const levelCounts = Object.values(stats);
      const percentages = levelCounts.map((count) => ((count / totalEmployees) * 100).toFixed(2));
      return percentages;
    });
    

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
            backgroundColor: "rgb(244, 253, 0)"
          },
          {
            label: "Level 3",
            data: data.map((stats) => stats[3]),
            backgroundColor: "rgb(255, 0, 0)"
          },
          {
            label: "Level 4",
            data: data.map((stats) => stats[4]),
            backgroundColor: "rgb(168, 251, 60)"
          },
          {
            label: "Level 5",
            data: data.map((stats) => stats[5]),
            backgroundColor: "rgb(255, 67, 5)"
          }
        ]
      },
      options: {
        scales: {
          x: { stacked: true },
          y: { stacked: true }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.formattedValue}%`,
            },
          },
        },
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [skillStats]);

  return (
    <div className="chart-containers">
      <canvas ref={chartRef} />
    </div>
  );
}
