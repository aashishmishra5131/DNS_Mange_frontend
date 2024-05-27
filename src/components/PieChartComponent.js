// PieChartComponent.js
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF', '#FF00AA', '#00AAFF', '#FFFF00', '#AAFF00', '#00FFFF'];

const PieChartComponent = ({ data }) => (
  <div className="w-full p-4 bg-white rounded shadow">
    <h2 className="text-2xl font-bold mb-4">DNS Records Distribution</h2>
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </div>
);

export default PieChartComponent;
