export const dummyTickets = [
  {
    title: 'Fix HVAC System',
    message: 'The HVAC system is malfunctioning and needs repair.',
    worker_assignment: 'John Doe',
    danger_level: 'High',
    ticket_date: '2024-10-01',
    ticket_progress: 'In Progress',
    image: 'https://example.com/hvac.png',
    cost: 5000,
    opportunity_cost: 2000,
  },
  {
    title: 'Water Leak in Plumbing',
    message: 'There is a major water leak that needs immediate attention.',
    worker_assignment: 'Jane Smith',
    danger_level: 'Critical',
    ticket_date: '2024-10-02',
    ticket_progress: 'Not Started',
    image: 'https://example.com/plumbing.png',
    cost: 3000,
    opportunity_cost: 1500,
  },
  {
    title: 'Electrical Issue in Building 2',
    message: 'The lights are flickering in the second floor of Building 2.',
    worker_assignment: 'Paul Anderson',
    danger_level: 'Medium',
    ticket_date: '2024-10-03',
    ticket_progress: 'Completed',
    image: 'https://example.com/electrical.png',
    cost: 2000,
    opportunity_cost: 1000,
  },
];

export const dummySuggestions = [
  {
    id: 1,
    suggestion:
      'Ensure all air conditioning units are functioning properly and schedule any necessary maintenance.',
    priority: 'High',
    icon: '🔥',
  },
  {
    id: 2,
    suggestion:
      'Provide tenants with tips on energy-efficient ways to keep their units cool without overusing AC.',
    priority: 'Medium',
    icon: '🌬️',
  },
  {
    id: 3,
    suggestion:
      'Inspect insulation in common areas and units to ensure they are maintaining cool air efficiently.',
    priority: 'High',
    icon: '🏠',
  },
];
