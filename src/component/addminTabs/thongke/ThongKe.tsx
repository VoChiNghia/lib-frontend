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
import { Chart } from "primereact/chart"
import { Button } from "primereact/button"
import ExportToExcel from "../../../utilities/exportExcel"
import { exportToExcel } from "../../../utilities/u"
const ThongKe = () => {
  const dispatch: DispatchType = useDispatch()
  const { getListBorrowBook, allPenalty, book, totalBooks } = useSelector((state: RootState) => state.book)
  const { user } = useSelector((state: RootState) => state.user)
  const [fromDate, setDateFrom] = useState(new Date("2021-1-1"))
  const [toDate, setDateTo] = useState(new Date())

  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})
  const [selectedCity, setSelectedCity] = useState<any>();
    const cities = [
        { name: 'Biểu đồ cột', code: 'x' },
        { name: 'Biểu đồ ngang', code: 'y' },
    ];

  const CountsByMonth = (items: any) => {
    const itemCountsByMonth = Array(12).fill(0)

    items.forEach((arr: any) => {
      const createdAt = new Date(arr.createdAt)
      const month = createdAt.getMonth()
      itemCountsByMonth[month]++
    })
    return itemCountsByMonth
  }

  useEffect(() => {
    dispatch(getAllBook(""))
    dispatch(getAllBorrowBook())
    dispatch(getAllPenalty())
    dispatch(getAllRequest())
    dispatch(getAllUser())
  }, [])
  console.log(selectedCity?.code)
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue("--text-color")
    const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary")
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border")
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
          label: "Thống kê sách",
          backgroundColor: documentStyle.getPropertyValue("--blue-500"),
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          data: CountsByMonth(book),
        },
        {
          label: "thống kê người dùng",
          backgroundColor: documentStyle.getPropertyValue("--pink-500"),
          borderColor: documentStyle.getPropertyValue("--pink-500"),
          data: CountsByMonth(user),
        },
        {
          label: "thống kê sách mượn",
          backgroundColor: documentStyle.getPropertyValue("--orange-500"),
          borderColor: documentStyle.getPropertyValue("--orange-500"),
          data: CountsByMonth(getListBorrowBook),
        },
      ],
    }
    const options = {
      indexAxis: selectedCity?.code ?? 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            fontColor: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    }

    setChartData(data)
    setChartOptions(options)
  }, [selectedCity])

  const dataList = [
    {
      TongSoSach: book?.filter((item: any) => {
        const itemDate = new Date(item?.createdAt)
        return itemDate >= fromDate && itemDate <= toDate
      }).length ?? 0,
      TongSoNguoiDung: user?.filter((item: any) => {
        const itemDate = new Date(item?.createdAt)
        return itemDate >= fromDate && itemDate <= toDate
      }).length ?? 0,
      TongSoSachMuon: getListBorrowBook?.filter((item: any) => {
        const itemDate = new Date(item?.createdAt)
        return itemDate >= fromDate && itemDate <= toDate
      }).length ?? 0,
      TongSoPhieuPhat: allPenalty?.filter((item: any) => {
        const itemDate = new Date(item?.createdAt)
        return itemDate >= fromDate && itemDate <= toDate
      }).length ?? 0,
    }
  ]

  console.log(selectedCity)
  return (
    <div className="bg-white rounded-xl">
      <div className="flex items-end justify-between">
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

        <div className="flex">
        <Button label="Xuất excel" icon='pi pi-file-excel' className="mx-2 " raised onClick={() => exportToExcel(dataList)}/>
        <div>
        <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                placeholder="Chọn loại biểu đồ" className="w-full md:w-14rem" />
        </div>
        </div>
      </div>
      <div className="p-4">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#333]">
            <thead className="text-xsuppercase bg-gray-50 text-[#333]">
              <tr className="text-center"> 
                <th scope="col" className="px-6 py-3">
                  Tổng số sách
                </th>
                <th scope="col" className="px-6 py-3">
                  Tổng số người dùng
                </th>
                <th scope="col" className="px-6 py-3">
                  Tổng số sách mượn
                </th>
                <th scope="col" className="px-6 py-3">
                  Tổng số phiếu phạt
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b  border-gray-700 text-center">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {book?.filter((item: any) => {
                    const itemDate = new Date(item?.createdAt)
                    return itemDate >= fromDate && itemDate <= toDate
                  }).length ?? 0}
                </th>
                <td className="px-6 py-4">
                  {" "}
                  {user?.filter((item: any) => {
                    const itemDate = new Date(item?.createdAt)
                    return itemDate >= fromDate && itemDate <= toDate
                  }).length ?? 0}
                </td>
                <td className="px-6 py-4">
                  {getListBorrowBook?.filter((item: any) => {
                    const itemDate = new Date(item?.createdAt)
                    return itemDate >= fromDate && itemDate <= toDate
                  }).length ?? 0}
                </td>
                <td className="px-6 py-4">
                  {" "}
                  {allPenalty?.filter((item: any) => {
                    const itemDate = new Date(item?.createdAt)
                    return itemDate >= fromDate && itemDate <= toDate
                  }).length ?? 0}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="card">
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}

export default ThongKe
