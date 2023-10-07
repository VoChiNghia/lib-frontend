import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DispatchType, RootState } from "../../../redux/store"
import { getAllBook, getAllBorrowBook, getAllPenalty } from "../../../redux/reducer/book"
import { getAllRequest } from "../../../redux/reducer/requestBook"
import { getAllUser } from "../../../redux/reducer/user"
import { Dropdown } from "primereact/dropdown"
import { Calendar } from "primereact/calendar"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Chart } from 'primereact/chart';
const ThongKe = () => {
  const dispatch: DispatchType = useDispatch()
  const { getListBorrowBook, allPenalty, book, totalBooks } = useSelector((state: RootState) => state.book)
  const { user } = useSelector((state: RootState) => state.user)
  const [fromDate, setDateFrom] = useState(new Date("2021-1-1"))
  const [toDate, setDateTo] = useState(new Date())

  const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

  const CountsByMonth = (items: any) => {
    const itemCountsByMonth = Array(12).fill(0);

    items.forEach((arr: any) => {
      const createdAt = new Date(arr.createdAt);
      const month = createdAt.getMonth();
      itemCountsByMonth[month]++;
    });
    return itemCountsByMonth
  }

  useEffect(() => {
    dispatch(getAllBook(""))
    dispatch(getAllBorrowBook())
    dispatch(getAllPenalty())
    dispatch(getAllRequest())
    dispatch(getAllUser())
  }, [])
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const data = {
        labels: [
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
        ],
        datasets: [
            {
                label: 'Thống kê sách',
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                data: CountsByMonth(book)
            },
            {
                label: 'thống kê người dùng',
                backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                borderColor: documentStyle.getPropertyValue('--pink-500'),
                data:  CountsByMonth(user)
            },
            {
              label: 'thống kê sách mượn',
              backgroundColor: documentStyle.getPropertyValue('--orange-500'),
              borderColor: documentStyle.getPropertyValue('--orange-500'),
              data:  CountsByMonth(getListBorrowBook)
          }
        ]
    };
    const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    fontColor: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };

    setChartData(data);
    setChartOptions(options);
}, []);

  return (
    <div className="bg-white rounded-xl">
      <div className="flex items-center">
        <div className="mx-2">
          <p className="font-bold my-2">Từ ngày</p>
          <Calendar value={fromDate} onChange={(e: any) => setDateFrom(e.value)} />
        </div>
        <div className="ms-2">
          <p className="font-bold my-2">Đến ngày</p>
          <Calendar value={toDate} onChange={(e: any) => setDateTo(e.value)} />
        </div>
      </div>
      <div className="p-4">
        <p className="font-bold text-xl my-3">
          Tổng số sách:{" "}
          {book.filter((item: any) => {
            const itemDate = new Date(item?.createdAt)
            return itemDate >= fromDate && itemDate <= toDate
          }).length ?? 0}
        </p>
        <p className="font-bold text-xl my-3">
          Tổng số người dùng:{" "}
          {user.filter((item: any) => {
            const itemDate = new Date(item?.createdAt)
            return itemDate >= fromDate && itemDate <= toDate
          }).length ?? 0}
        </p>
        <p className="font-bold text-xl my-3">
          Tổng số sách mượn:{" "}
          {getListBorrowBook.filter((item: any) => {
            const itemDate = new Date(item?.createdAt)
            return itemDate >= fromDate && itemDate <= toDate
          }).length ?? 0}
        </p>
        <p className="font-bold text-xl my-3">
          Tổng số phiếu phạt:{" "}
          {allPenalty.filter((item: any) => {
            const itemDate = new Date(item?.createdAt)
            return itemDate >= fromDate && itemDate <= toDate
          }).length ?? 0}
        </p>
      </div>
      <div className="card">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    </div>
  )
}

export default ThongKe
