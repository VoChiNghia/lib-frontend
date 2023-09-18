import React from "react";
import ExcelJs from "exceljs";
import { SplitButton } from 'primereact/splitbutton';
import { changeComponent, setIsOpenCompoent } from "../redux/reducer/modal";
import AddBook from "../component/form/formAddBook/AddBook";
import { useDispatch } from "react-redux";
import { DispatchType } from "../redux/store";
import AddFile from "../component/form/formAddFile/AddFile";
import { Button } from "primereact/button";


const ExportToExcel = ({dataList}: any) => {

  const dispatch: DispatchType = useDispatch()

  const exportToExcel = (data: any) => {
    let sheetName = `export-book.xlsx`;
    let headerName = "RequestsList";

    // 获取sheet对象，设置当前sheet的样式
    // showGridLines: false 表示不显示表格边框
    let workbook = new ExcelJs.Workbook();
    let sheet = workbook.addWorksheet(sheetName, {
      views: [{ showGridLines: false }]
    });
    // let sheet2 = workbook.addWorksheet("Second sheet", { views: [{ showGridLines: false }] });

    // 获取每一列的header
    let columnArr = [];
    for (let i in data[0]) {
      let tempObj = { name: "" };
      tempObj.name = i;
      columnArr.push(tempObj);
    }

    // 设置表格的头部信息，可以用来设置标题，说明或者注意事项
    sheet.addTable({
      name: `Header`,
      ref: "A1", // 头部信息从A1单元格开始显示
      headerRow: true,
      totalsRow: false,
      style: {
        showRowStripes: false,
        showFirstColumn: true,
      },
      columns: [{ name: "This is the header text" }, { name: "Hahaha" }],
      rows: [[`As of: 07/09/2021`], [`Allen`]]
    });

    // 设置表格的主要数据部分
    sheet.addTable({
      name: headerName,
      ref: "A5", // 主要数据从A5单元格开始
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "TableStyleMedium2",
        showRowStripes: false,
      },
      columns: columnArr ? columnArr : [{ name: "" }],
      rows: data.map((e: any) => {
        let arr = [];
        for (let i in e) {
          arr.push(e[i]);
        }
        return arr;
      })
    });

    sheet.getCell("A1").font = { size: 20, bold: true }; // 设置单元格的文字样式

    // 设置每一列的宽度
    sheet.columns = sheet.columns.map((e: any) => {
      const expr = e.values[5];
      switch (expr) {
        case "Name":
          return { width: 50 };
        case "Gender":
          return { width: 40 };
        case "Height":
          return { width: 30 };
        default:
          return { width: 20 };
      }
    });

    const table: any = sheet.getTable(headerName);
    for (let i = 0; i < table.table.columns.length; i++) {
      sheet.getCell(`${String.fromCharCode(65 + i)}5`).font = { size: 12 };
      sheet.getCell(`${String.fromCharCode(65 + i)}5`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "c5d9f1" }
      };

      for (let j = 0; j < table.table.rows.length; j++) {
        let rowCell = sheet.getCell(`${String.fromCharCode(65 + i)}${j + 6}`);
        rowCell.alignment = { wrapText: true };
        rowCell.border = {
          bottom: {
            style: "thin",
            color: { argb: "a6a6a6" }
          }
        };
      }
    }
    sheet.eachRow((row, rowNumber) => {
      row.height = 50;
    });
    table.commit();

    const writeFile = (fileName: any, content: any) => {
      const link = document.createElement("a");
      const blob = new Blob([content], {
        type: "application/vnd.ms-excel;charset=utf-8;"
      });
      link.download = fileName;
      link.href = URL.createObjectURL(blob);
      link.click();
    };

    // 表格的数据绘制完成，定义下载方法，将数据导出到Excel文件
    workbook.xlsx.writeBuffer().then((buffer: any) => {
      writeFile(sheetName, buffer);
    });
  };

  const AddBookBtn = () => {
    dispatch(changeComponent(<AddBook />))
          dispatch(setIsOpenCompoent(true))
    
};
const AddFileBtn = () => {
  dispatch(changeComponent(<AddFile />))
        dispatch(setIsOpenCompoent(true))
  
};
const items = [
  {
    label: 'Thêm tài liệu',
      icon: 'pi pi-plus',
      command: () => {
        dispatch(changeComponent(<AddFile />))
        dispatch(setIsOpenCompoent(true))
      }
  },
  {
    label: 'Export',
    icon: 'pi pi-file-excel',
    command: () => {
      
      exportToExcel(dataList);
    }
  },
];

  return (
    // <button
    //   onClick={() => {
    //     exportToExcel(dataList);
    //   }}
    // >
    //   Export to Excel
    // </button>
   <div className="">
     <Button label="Thêm sách" icon='pi pi-plus' className="mx-2" raised  onClick={AddBookBtn}/>
     <Button label="Thêm Tài liệu" icon='pi pi-plus' className="mx-2" text raised  onClick={AddFileBtn}/>
     <Button label="Xuất excel" icon='pi pi-file-excel' className="mx-2" text raised onClick={() => exportToExcel(dataList)}/>
   </div>
    
  );
};

export default ExportToExcel;
