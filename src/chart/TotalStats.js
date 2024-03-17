import React, { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import "./total.css";
import chartData from "../data/chartData";

export default function TotalStats() {
  const [skillStats, setSkillStats] = useState({});

  useEffect(() => {
    const generateSkillStats = () => {
      const stats = {};
      const totalSkills = chartData.reduce(
        (acc, employee) => acc + employee.skills.length,
        0
      );

      chartData.forEach((employee) => {
        if (employee.department) {
          employee.skills.forEach((skill) => {
            if (!stats[skill.name]) {
              stats[skill.name] = {
                total: 0,
                percentage: 0,
              };
            }
            stats[skill.name].total++;
            stats[skill.name].percentage =
              (stats[skill.name].total / totalSkills) * 100;
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
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Total",
            data: Object.values(skillStats).map(
              (stats) => stats.percentage
            ),
            backgroundColor: backgroundColors,
          },
        ],
      },
      options: {
        scales: {
          x: { stacked: true },
          y: { stacked: true },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (tooltipItem) =>
                `${tooltipItem.label}: ${tooltipItem.formattedValue}%`,
            },
          },
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
      colors.push(
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.8)`
      );
    }
    return colors;
  };

  return (
    <div className="chartzz-containers">
      <canvas ref={chartRef} />
    </div>
  );
}
