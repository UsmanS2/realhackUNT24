"use client";

import React, { useEffect, useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CategoryModalProps {
  title: string;
  score: number;
  onClose: () => void;
}

interface Ticket {
  _id: string;
  title: string;
  message: string;
  assignment: string;
  danger_level: number;
  date: string;
  issue_date: string;
  progress: number;
  image: string;
  cost: number;
  category: string;
  opp_cost: number;
}
const CategoryModal: React.FC<CategoryModalProps> = ({ title, onClose }) => {
  const [showOpportunityCost, setShowOpportunityCost] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    fetchAndSetTickets();
  }, []);

  const fetchAndSetTickets = async () => {
    const fetchedTickets = await fetchTickets();
    setTickets(fetchedTickets);
  };

  async function fetchTickets() {
    const response = await fetch("/api/getTickets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data.tickets;
  }

  const totalCost = tickets
    ?.filter((ticket) => ticket.category === title)
    .reduce((acc, ticket) => acc + ticket.cost, 0);
  const totalOppCost = tickets
    ?.filter((ticket) => ticket.category === title)
    .reduce((acc, ticket) => acc + ticket.opp_cost, 0);

  const prevQuarterCost = totalCost * 1.2;
  const forecastCost = totalCost * 1.8;

  const prevQuarterOppCost = totalOppCost * 0.7;
  const forecastOppCost = totalOppCost * 2.8;

  const toggleCost = () => setShowOpportunityCost(!showOpportunityCost);

  const chartData = {
    labels: ["Previous Quarter", "Current Total", "Forecast"],
    datasets: [
      {
        label: showOpportunityCost ? "Opportunity Cost" : "Total Cost",
        data: showOpportunityCost
          ? [prevQuarterOppCost, totalOppCost, forecastOppCost]
          : [prevQuarterCost, totalCost, forecastCost],
        backgroundColor: showOpportunityCost
          ? ["#facc15", "#facc15", "transparent"]
          : ["#4ade80", "#4ade80", "transparent"],
        borderColor: showOpportunityCost
          ? ["#facc15", "#facc15", "#facc15"]
          : ["#4ade80", "#4ade80", "#4ade80"],
        borderWidth: [0, 0, 2],
        hoverBackgroundColor: showOpportunityCost
          ? ["#facc15", "#facc15", "transparent"]
          : ["#4ade80", "#4ade80", "transparent"],
        hoverBorderColor: showOpportunityCost
          ? ["#facc15", "#facc15", "#facc15"]
          : ["#4ade80", "#4ade80", "#4ade80"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  async function deleteTicket(id: string) {
    const response = await fetch("/api/deleteTicket", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      console.error("Failed to delete ticket");
      return;
    }

    const data = await response.json();
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='relative bg-white rounded-lg p-8 w-3/4 max-w-6xl shadow-lg flex'>
        <div className='w-1/2 pr-6 overflow-y-auto max-h-[500px]'>
          <h2 className='text-xl font-bold mb-4'>
            {title.toUpperCase()} - Active Tickets
          </h2>
          {tickets
            .filter((ticket) => ticket.category === title)
            .map((ticket, idx) => (
              <div key={idx} className='mb-4 border-b pb-4 relative'>
                <h3 className='font-bold'>{ticket.title}</h3>
                <p>Assigned to: {ticket.assignment}</p>
                <p>
                  Progress:{" "}
                  {ticket.progress === 2
                    ? "Completed"
                    : ticket.progress === 1
                    ? "In Progress"
                    : "Not Started"}
                </p>
                <div>
                  <button
                    onClick={() => {
                      deleteTicket(ticket._id);
                      onClose();
                    }}
                    className='absolute bg-red-500 text-white px-4 py-2 rounded-lg right-0 top-5'
                  >
                    Close
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div className='w-1/2 pl-6'>
          <h2 className='text-xl font-bold mb-4'>Costs Overview</h2>
          <div className='mb-6'>
            <Bar data={chartData} options={chartOptions} />
          </div>

          <div className='flex justify-between items-center mb-4'>
            <button
              onClick={toggleCost}
              className='bg-blue-500 text-white px-4 py-2 rounded-lg'
            >
              {showOpportunityCost
                ? "Show Total Cost"
                : "Show Opportunity Cost"}
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className='absolute right-3 top-3 text-white font-bold text-xl px-4 py-2 bg-red-600 rounded-full'
        >
          X
        </button>
      </div>
    </div>
  );
};

export default CategoryModal;
