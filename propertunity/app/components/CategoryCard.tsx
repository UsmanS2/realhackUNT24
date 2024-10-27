"use client";
import React from "react";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryCardProps {
  title: string;
  score: number;
  nobg?: boolean;
  onClick?: () => void;
}

const CategoryCard = ({
  title,
  score,
  nobg = false,
  onClick,
}: CategoryCardProps): JSX.Element => {
  const getColor = (score: number) => {
    if (score < 50) return "#f87171";
    if (score >= 50 && score <= 75) return "#facc15";
    return "#4ade80";
  };

  const data = {
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: [getColor(score), "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "80%",
    rotation: -90,
    circumference: 180,
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
  };

  return (
    <div
      onClick={onClick}
      className={`${nobg ? "" : "bg-white"} ${
        nobg ? "" : "shadow-lg"
      } p-6 rounded-lg text-center `}
    >
      <p className='font-semibold text-black text-xl'>{title}</p>
      <div className='flex flex-col items-center'>
        <p className='text-lg font-bold text-gray-500'>Health Score</p>
        <div className='relative w-48 h-48'>
          <Doughnut data={data} options={options} />
          <div className='absolute mt-5 inset-0 flex items-center justify-center text-2xl font-bold text-black'>
            {score}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
