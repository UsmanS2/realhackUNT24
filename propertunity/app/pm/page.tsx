"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// DoughnutChart component using Chart.js
function DoughnutChart({ value, color }: { value: number; color: string }) {
  const data = {
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: [color, "#e2e8f0"], // Primary color and background
        hoverBackgroundColor: [color, "#e2e8f0"],
        borderWidth: 0, // Remove border for a clean look
      },
    ],
  };

  const options = {
    cutout: "75%", // Creates a ring effect
    plugins: {
      tooltip: { enabled: false }, // Disable tooltip
      legend: { display: false }, // Hide legend
    },
  };

  return (
    <div className='relative w-[200px] h-[200px] lg:w-[250px] lg:h-[250px]'>
      <Doughnut data={data} options={options} />
      <div className='absolute inset-0 flex items-center justify-center text-2xl lg:text-3xl font-bold text-gray-700'>
        {value}%
      </div>
    </div>
  );
}

// PMLandingPage component with DoughnutChart
export const PMLandingPage: React.FC = () => {
  return (
    <div className='bg-white py-12 lg:py-24 px-4 lg:px-12'>
      <h1 className='text-center text-black dark:text-white text-[2rem] lg:text-[3rem] font-extrabold leading-tight tracking-tight'>
        Welcome to{" "}
        <span className='bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent'>
          Your Buildings
        </span>
      </h1>

      {/* Building 1 */}
      <div className='flex flex-col lg:flex-row items-center justify-between py-8'>
        <div className='max-w-[480px] lg:mr-12 mb-8 lg:mb-0 text-center lg:text-left'>
          <h2 className='text-black dark:text-white text-[2rem] lg:text-[2.75rem] font-extrabold leading-snug'>
            <span className='bg-blue-100 text-blue-800 rounded px-3 py-1 inline-block'>
              Building 1
            </span>
          </h2>
          <p className='text-gray-500 mt-2 lg:mt-4 text-md lg:text-lg'>
            Located in Dallas, Texas
          </p>

          <div className='mt-6 lg:mt-8'>
            <button className='flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300 shadow-md'>
              View Details →
            </button>
          </div>
        </div>

        <DoughnutChart value={70} color='orange' />
      </div>

      {/* Building 2 */}
      <div className='flex flex-col lg:flex-row items-center justify-between py-8'>
        <div className='max-w-[480px] lg:mr-12 mb-8 lg:mb-0 text-center lg:text-left'>
          <h2 className='text-black dark:text-white text-[2rem] lg:text-[2.75rem] font-extrabold leading-snug'>
            <span className='bg-blue-100 text-blue-800 rounded px-3 py-1 inline-block'>
              Building 2
            </span>
          </h2>
          <p className='text-gray-500 mt-2 lg:mt-4 text-md lg:text-lg'>
            Located in Los Angeles, California
          </p>

          <div className='mt-6 lg:mt-8'>
            <button className='flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300 shadow-md'>
              View Details →
            </button>
          </div>
        </div>

        <DoughnutChart value={90} color='green' />
      </div>
    </div>
  );
};

export default PMLandingPage;
