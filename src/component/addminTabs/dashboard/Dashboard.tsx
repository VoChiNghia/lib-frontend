import React from "react";
import "./dashboard.scss";
import { CiLogout } from "react-icons/ci";
import { BsUiRadiosGrid, BsBook } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import {
  PiKeyReturnLight,
  PiMicrosoftExcelLogo,
  PiArrowElbowRightLight,
  PiArrowDownRightLight,
} from "react-icons/pi";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
const data = {
  labels: ["Số sách mượn", "Số sách trả"],
  datasets: [
    {
      label: "# of Votes",
      data: [20, 19],
      backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
};
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Bảng Thống Kê Theo Tháng",
    },
  },
};

const labelsForBarChart = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

const dataForbarChart = {
  labels: labelsForBarChart,
  datasets: [
    {
      label: "Tổng Số Sách",
      data: labelsForBarChart.map(() => Math.random() * 1000),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Tổng Số Người Dùng",
      data: labelsForBarChart.map(() => Math.random() * 1000),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-container-item">
          <div className="total-book">
            <div>
              <BsBook />
            </div>
            <h3>Tổng số sách</h3>
          </div>
          <p>
            1,000{" "}
          </p>
          <div className="rate">
            <span>
              <PiArrowElbowRightLight />
            </span>{" "}
            10%
          </div>
        </div>
        <div className="dashboard-container-item">
          <div className="total-book">
            <div className="blue">
              <AiOutlineUsergroupAdd />
            </div>
            <h3>Tổng số người dùng</h3>
          </div>
          <p>500</p>
          <div className="rate red">
            <span>
              <PiArrowDownRightLight />
            </span>{" "}
            10%
          </div>
        </div>
        <div className="dashboard-container-item">
          <Doughnut data={data} />
        </div>
        <div className="dashboard-container-item">
          <div className="total-book">
            <div>
              <BsBook />
            </div>
            <h3>Tổng số sách mượn</h3>
          </div>
          <p>
            3{" "}
          </p>
          <div className="rate">
            <span>
              <PiArrowElbowRightLight />
            </span>{" "}
            10%
          </div>
        </div>
      </div>
      <div className="dashboard-container-item-2">
        <Bar options={options} data={dataForbarChart} />
      </div>
    </div>
  );
};

export default Dashboard;
