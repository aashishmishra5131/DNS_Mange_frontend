// ModalChart.js
import React from 'react';
import Modal from 'react-modal';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF', '#FF00AA', '#00AAFF', '#FFFF00', '#AAFF00', '#00FFFF'];

const ModalChart = ({ isOpen, onRequestClose, data }) => (
  <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="DNS Records Chart" className="absolute inset-0 flex items-center justify-center">
    <div className="p-8 rounded-lg shadow-lg bg-slate-200">
      <h2 className="text-2xl font-bold mb-4">DNS Records Distribution</h2>
      <PieChart width={400} height={450}>
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
      <div className="flex justify-end mt-4">
        <button onClick={onRequestClose} className="bg-red-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  </Modal>
);

export default ModalChart;
