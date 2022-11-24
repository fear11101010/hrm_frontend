import * as XLSX from "xlsx";
import ReactDOM from "react-dom";
import { jsPDF } from "jspdf";
import { Button, ButtonGroup } from "react-bootstrap";
import { FaFileExcel, FaFilePdf, FaPrint } from "react-icons/fa";
import React, { useRef } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";

function ExcelPdfPrint({ exportExcel, exportPdf, print, data, columns, header }) {
  const { width, height } = useWindowDimensions();
  console.log(data);
  const tableData = ((Array.isArray(data) && data) || data).map((pv, i) => {
    return columns.reduce((c, p) => ({ ...c, [p.key]: p.value(pv, i) }), {});
  });
  console.log(tableData);
  const tableColumns = columns.map((v) => v.key);
  const tableRef = useRef();
  const generateExcel = (e) => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "sheet1");
    return XLSX.writeFile(workbook, `${header ?? "file"}.xlsx`);
  };
  const printData = (e) => {
    const tableToPrint = tableRef.current;
    console.log(ReactDOM.findDOMNode(tableToPrint).outerHTML.replace("display: none;", ""));
    const newWin = window.open("");
    newWin.document.write(ReactDOM.findDOMNode(tableToPrint).outerHTML.replace("display: none;", ""));
    newWin.print();
    newWin.close();
  };
  const generatePdf = (e) => {
    const element = tableRef.current;
    console.log({ width, height });
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    const tempImg = document.createElement("img");
    tempImg.addEventListener("load", function (event) {
      console.log(event);
      ctx.drawImage(event.target, 0, 0);
      const data = canvas.toDataURL();
      const pdf = new jsPDF();
      const imgProperties = pdf.getImageProperties(data);
      console.log(imgProperties);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      console.log(pdfWidth);
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
      console.log(pdfWidth, pdfHeight);

      pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("print.pdf");
    });

    tempImg.src =
      "data:image/svg+xml," +
      encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
<foreignObject width="100%" height="100%">
<div xmlns="http://www.w3.org/1999/xhtml">
${ReactDOM.findDOMNode(element).outerHTML.replace("display: none;", "")}
</div>
</foreignObject>
</svg>`);
  };

  return (
    <>
      <div className="mb-2">
        {data && Array.isArray(data) && data.length > 0 && (
          <ButtonGroup>
            {exportExcel && (
              <Button variant="primary" size="sm" onClick={generateExcel}>
                <FaFileExcel /> Excel
              </Button>
            )}
            {exportPdf && (
              <Button variant="primary" size="sm" onClick={generatePdf}>
                <FaFilePdf /> Pdf
              </Button>
            )}
            {print && (
              <Button variant="primary" size="sm" onClick={printData}>
                <FaPrint /> Print
              </Button>
            )}
          </ButtonGroup>
        )}
      </div>
      {data && (
        <div ref={tableRef} style={{ display: "none", fontSize: "20px" }}>
          {header && <h3 style={{ margin: "15px 0 20px 0", textAlign: "center" }}>{header}</h3>}
          <table width="100%" border="1" style={{ borderCollapse: "collapse", fontSize: "20px" }}>
            <thead>
              {tableColumns && (
                <tr>
                  {tableColumns.map((v, i) => (
                    <th
                      key={`${v}_${i}`}
                      style={{
                        wordBreak: "normal",
                        wordWrap: "normal",
                        border: "1px solid",
                      }}
                    >
                      {v}
                    </th>
                  ))}
                </tr>
              )}
            </thead>
            <tbody>
              {tableData &&
                tableData.map((v, i) => (
                  <tr key={`${v}-${i}`}>
                    {tableColumns.map((c, i) => (
                      <td
                        key={`${v[c]}_${c}_${i}`}
                        style={{
                          wordBreak: "break-word",
                          wordWrap: "normal",
                          border: "1px solid",
                        }}
                      >
                        {v[c]}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

ExcelPdfPrint.defaultProps = {
  exportExcel: true,
  exportPdf: true,
  print: true,
  data: null,
};
export default ExcelPdfPrint;
