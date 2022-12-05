import axios from 'axios';
import { useState, useEffect, useRef, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

export const LineChart = ({ title, measurements, labels }) => {
  let scales;
  if (title === 'Temperature') {
    scales = {
      yAxis: {
        min: 0,
        max: 50,
      },
    };
  } else {
    scales = {
      yAxis: {
        min: 0,
        max: 100,
      },
    };
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
      scales,
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: labels.map((i) => measurements[labels.indexOf(i)]),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53,162,235, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
};
