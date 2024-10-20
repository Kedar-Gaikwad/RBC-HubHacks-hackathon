import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// 注册chart.js中的组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HousingGapChart = () => {
  // 模拟数据：各个地区的住房需求和差距
  const data = {
    labels: ['Halifax', 'Sydney', 'Dartmouth', 'Truro', 'Bridgewater'], // 各地区名称
    datasets: [
      {
        label: 'Housing Demand',  // 住房需求
        data: [4643, 1278, 879, 634, 266],  // 住房需求数据
        backgroundColor: 'rgba(75, 192, 192, 0.6)',  // 住房需求柱的颜色
      },
      {
        label: 'Housing underutilized',  // 住房差距
        data: [962, 256, 156, 87, 44],  // 住房差距数据
        backgroundColor: 'rgba(255, 99, 132, 0.6)',  // 住房差距柱的颜色
      },
    ],
  };

  // 配置选项
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Housing underutilized and Demand in Different Regions of Nova Scotia',
      },
    },
    scales: {
      y: {
        beginAtZero: true,  // Y轴从0开始
      },
    },
  };

  return (
    <div>
      <h2>Housing underutilized Analysis</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default HousingGapChart;


