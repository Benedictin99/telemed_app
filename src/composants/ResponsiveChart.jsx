import React from "react";
import { Bar } from "react-chartjs-2";
import "../utils";

export default function ResponsiveChart({ data, options: userOptions }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", label: { boxWidth: 12 } },
      title: {
        display: !!userOptions?.title,
        text: userOptions?.title,
        font: { size: 14 },
      },
    },
    scales: {
      x: { ticks: { maxRotation: 45, minRotation: 45 } },
      y: { beginAtZero: true },
    },
    ...userOptions,
  };
  return (
    <div className="w-full h-full min-w-0 hover:scale-105 transition-all duration-200">
      <Bar data={data} options={options} className="min-w-0" />
    </div>
  );
}
