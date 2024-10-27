import React, { useState } from 'react';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface CategoryModalProps {
  title: string;
  score: number;
  onClose: () => void;
}

const dummyTickets = [
  {
    title: 'Fix HVAC System',
    worker_assignment: 'John Doe',
    ticket_progress: 'In Progress',
    cost: 5000,
    opportunity_cost: 2000,
  },
  {
    title: 'Water Leak in Plumbing',
    worker_assignment: 'Jane Smith',
    ticket_progress: 'Not Started',
    cost: 3000,
    opportunity_cost: 1500,
  },
  {
    title: 'Electrical Issue in Building 2',
    worker_assignment: 'Paul Anderson',
    ticket_progress: 'Completed',
    cost: 2000,
    opportunity_cost: 1000,
  },
  {
    title: 'Electrical Issue in Building 2',
    worker_assignment: 'Paul Anderson',
    ticket_progress: 'Completed',
    cost: 2000,
    opportunity_cost: 1000,
  },
  {
    title: 'Electrical Issue in Building 2',
    worker_assignment: 'Paul Anderson',
    ticket_progress: 'Completed',
    cost: 2000,
    opportunity_cost: 1000,
  },
  {
    title: 'Electrical Issue in Building 2',
    worker_assignment: 'Paul Anderson',
    ticket_progress: 'Completed',
    cost: 2000,
    opportunity_cost: 1000,
  },
];

const CategoryModal: React.FC<CategoryModalProps> = ({ title, score, onClose }) => {
  const [showOpportunityCost, setShowOpportunityCost] = useState(false);

  // Calculate the total costs
  const totalCost = dummyTickets.reduce((acc, ticket) => acc + ticket.cost, 0);
  const totalOppCost = dummyTickets.reduce((acc, ticket) => acc + ticket.opportunity_cost, 0);

  const toggleCost = () => {
    setShowOpportunityCost(!showOpportunityCost);
  };

  // Chart Data
  const chartData = {
    labels: ['Total Cost'],
    datasets: [
      {
        label: showOpportunityCost ? 'Opportunity Cost' : 'Total Cost',
        data: [showOpportunityCost ? totalOppCost : totalCost],
        backgroundColor: showOpportunityCost ? '#facc15' : '#4ade80',
      },
    ],
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg p-8 w-3/4 max-w-6xl shadow-lg flex">
        {/* Tickets Section */}
        <div className="w-1/2 pr-6 overflow-y-auto max-h-[500px]">
          <h2 className="text-xl font-bold mb-4">{title} - Active Tickets</h2>
          {dummyTickets.map((ticket, idx) => (
            <div key={idx} className="mb-4 border-b pb-4">
              <h3 className="font-bold">{ticket.title}</h3>
              <p>Assigned to: {ticket.worker_assignment}</p>
              <p>Progress: {ticket.ticket_progress}</p>
            </div>
          ))}
        </div>

        {/* Graph Section */}
        <div className="w-1/2 pl-6">
          <h2 className="text-xl font-bold mb-4">Costs Overview</h2>
          <div className="mb-6">
            <Bar data={chartData} options={{ responsive: true }} />
          </div>

          {/* Toggle Button for Opportunity Cost */}
          <div className="flex justify-between items-center mb-4">
            <button onClick={toggleCost} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              {showOpportunityCost ? 'Show Total Cost' : 'Show Opportunity Cost'}
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-white font-bold text-xl px-4 py-2 bg-red-600 rounded-full"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default CategoryModal;
