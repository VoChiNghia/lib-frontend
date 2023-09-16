import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../../redux/store";
import { getAllBook, getAllBookBorrowByMonth, getAllBorrowBook } from "../../../redux/reducer/book";
import { getAllUser } from "../../../redux/reducer/user";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

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
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

const dataForbarChart = {
  labels: labelsForBarChart,
  datasets: [
    {
      label: "Tổng Số Sách",
      data: labelsForBarChart.map((item,index) => Math.random() * 1000),
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
  const { totalBooks } = useSelector((state: RootState) => state.book)
  const { user } = useSelector((state: RootState) => state.user);
  const { getListBorrowBook,statisticalBorrow } = useSelector((state: RootState) => state.book)
  const dispatch: DispatchType = useDispatch();
  console.log(statisticalBorrow)
  useEffect(() => {
    dispatch(getAllBorrowBook())
    dispatch(getAllBook(''))
    dispatch(getAllUser());
    dispatch(getAllBookBorrowByMonth());
  }, [])

  const codeCount = getListBorrowBook?.filter((obj: any) => obj.status === 'return').length;
const studyCount = getListBorrowBook?.filter((obj: any) => obj.status === 'borrowed').length;

console.log(codeCount,studyCount)

  const data = {
    labels: ["Số sách mượn", "Số sách trả"],
    datasets: [
      {
        label: "# of Votes",
        data: [studyCount, codeCount],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
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
          {totalBooks}{" "}
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
          <p>{user?.length}</p>
        </div>
        <div className="dashboard-container-item">
          <Doughnut data={data} />
        </div>
        <div className="dashboard-container-item">
          <div className="total-book">
            <div>
              <BsBook />
            </div>
            <h3>sách mượn trả</h3>
          </div>
          <p>
            {getListBorrowBook ? getListBorrowBook.length : '0'}{" "}
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

