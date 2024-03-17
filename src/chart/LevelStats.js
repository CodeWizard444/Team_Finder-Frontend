import React, { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import "./level.css";
import chartData from "../data/chartData";

export default function LevelStats() {
  const [skillStats, setSkillStats] = useState({});

  useEffect(() => {
    const generateSkillStats = () => {
      const stats = {};
      chartData.forEach((employee) => {
        if (employee.department) {
          employee.skills.forEach((skill) => {
            if (!stats[skill.name]) {
              stats[skill.name] = { total: 0 }; 
              for (let i = 0; i <= 5; i++) {
                stats[skill.name][i] = 0; 
              }
            }
            stats[skill.name].total++;
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
    const data = Object.values(skillStats).map((stats) =>
      Object.values(stats)
    );

    const backgroundColors = generateRandomColors(labels.length);

    chartInstance.current = new Chart(myChartRef, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Total",
            data: Object.values(skillStats).map((stats) => stats.total),
            backgroundColor: backgroundColors,
          },
        ],
      },
      options: {
        scales: {
          x: { stacked: true },
          y: { stacked: true },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [skillStats]);
  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      colors.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.8)`);
    }
    return colors;
  };

  return (
    <div className="chartz-container">
      <canvas ref={chartRef} />
    </div>
  );
}
