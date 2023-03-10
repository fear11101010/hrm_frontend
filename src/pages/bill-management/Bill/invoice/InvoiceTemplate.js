import jsPDF from "jspdf";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Col, Image, Row, Table } from "react-bootstrap";
import { API } from "../../../../utils/axios/axiosConfig";
import { BILL_EACH_GET } from "../../../../utils/routes/api_routes/BILL_API_ROUTES";
import html2canvas from "html2canvas";
import "./table.css";
import DS_Logo from "./ds-next-logo.png";
import { toWords } from "../../../../utils/NumtoWords";

export default function InvoiceTemplate({ invoice_id }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");

  useEffect(() => {
    setLoading(true);
    API.get(BILL_EACH_GET(invoice_id))
      .then((res) => {
        setData(res?.data);
        setTotalAmount(res?.data?.invoice[0]?.totalamount);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const generatePdf = () => {
    var inv = document.getElementById("report");
    var date = new Date();
    var hide_download_btn = document.getElementById("invoice_download_btn").setAttribute("style", "display:none");
    var align_header_without_download_btn = document
      .getElementById("invoive_header")
      .setAttribute("style", "display:flex, justify-content:center, align-items:center");

    html2canvas(inv).then((canvas) => {
      var imgWidth = 210;
      var pageHeight = 297;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      //enter code here
      const imgData = canvas.toDataURL("image/png");

      var doc = new jsPDF();
      var position = 0;

      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight + 15);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight + 15);
        heightLeft -= pageHeight;
      }
      doc.save(`Invoice_${data?.invoice?.map((d) => d?.invoice_code)}` + ".pdf");
    });
    var show_download_btn = document.getElementById("invoice_download_btn").setAttribute("style", "display:block");
  };
  return (
    <div id="report" style={{ marginTop: "69px" }} className="inv-table">
      <Row className="px-5 py-4">
        <Col sm={12} md={12}>
          <div className="d-flex justify-content-between align-items-baseline" id="invoive_header">
            <div className="d-flex align-items-center mb-0">
              <div className="me-3">
                <Image src={DS_Logo} width="140px" />
              </div>
              <div>
                <h1 className="mb-2">Datasoft Systems Bangladesh Limited</h1>
                <h4 className="mb-0"> Rupayan Shelford, 20th Floor, 23/6 Mirpur Rd, Dhaka 1207</h4>
              </div>
            </div>
            <Button id="invoice_download_btn" variant="light" size="sm" className="border py-2" onClick={generatePdf}>
              <h5 className="mb-0">
                <i className="fe fe-download" /> Download
              </h5>
            </Button>
          </div>
          <hr />
          <h4 className="text-center"> Bill Form </h4>
          <div className="d-flex justify-content-between">
            <div>
              <h4 className="mb-1 text-secondary">INVOICE NUMBER: </h4>
              <h4 className="mb-0 ">{data?.invoice?.map((d) => d?.invoice_code)} </h4>
            </div>
          </div>
          <div className="mt-4">
            <Row>
              <Col md={6} className="mb-3">
                <div>
                  <h4 className="mb-1 text-secondary">Project Name: </h4>
                  <h4 className="mb-1">{data?.invoice?.map((d) => d?.project?.name)}</h4>
                </div>
              </Col>
              <Col md={6} className="mb-3">
                <div>
                  <h4 className="mb-1 text-secondary">DATE: </h4>
                  <h4 className="mb-0 "> {data?.invoice?.map((d) => moment(d?.invoice_date).format("MM/DD/YYYY"))} </h4>
                </div>
              </Col>
              <Col md={6} className="mb-3">
                <div>
                  <h4 className="mb-1 text-secondary">Name: </h4>
                  <h4 className="mb-0 "> {data?.invoice?.map((d) => d?.employee?.name)} </h4>
                </div>
              </Col>
              <Col md={6} className="mb-3">
                <div>
                  <h4 className="mb-1 text-secondary">Designation: </h4>
                  <h4 className="mb-0 "> {data?.invoice?.map((d) => d?.employee?.designation)} </h4>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col sm={4} md={4}>
          <div className="text-end"></div>
        </Col>
      </Row>

      {/* TABLE */}
      <div className="bg-white px-5">
        <Table bordered>
          <thead>
            <tr>
              <th style={{ width: "15%", borderColor: "#222" }}>Date</th>
              <th className="text-center" style={{ width: "70%", borderColor: "#222" }}>
                Particulars
              </th>
              <th className="text-center" style={{ width: "70%", borderColor: "#222" }}>
                Qty
              </th>
              <th style={{ width: "15%", borderColor: "#222" }} className="text-end">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.invoice_items?.map((d) => (
              <tr>
                <td style={{ borderColor: "#222" }}>{moment(d?.date).format("DD-MM-YYYY")}</td>
                <td style={{ borderColor: "#222" }}>{d?.description}</td>
                <td className="text-center" style={{ borderColor: "#222" }}>
                  {d?.qty}
                </td>
                <td style={{ borderColor: "#222" }} className="text-end">
                  {d?.cost}
                </td>
              </tr>
            ))}
            <tr>
              <td style={{ borderColor: "#222" }} colSpan={3} className="text-end">
                <h4 className="mb-0">Total Amount: </h4>
              </td>
              <td style={{ borderColor: "#222" }}>
                <h4 className="mb-0 text-end">{data?.invoice?.map((d) => d?.totalamount)}</h4>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div className="px-5">
        <div className="d-flex">
          <h3 className="mb-0 me-1"> Amount in words: </h3>
          <h3>{totalAmount !== "" && toWords(totalAmount)}</h3>
          {/* <h3 className="mb-0 text-end">{data?.invoice?.map((d) => d?.totalamount)}</h3> */}
        </div>
      </div>
      <div className="px-5" style={{ marginTop: "72px" }}>
        <Row className="text-center">
          <Col md={4}>
            <h5 className="mb-1">{data?.invoice?.map((d) => d?.employee?.name)}</h5>
            <h5 className="text-secondary">Submitted By</h5>
          </Col>
          <Col md={4}>
            <h5 className="mb-1">{data?.invoice?.map((d) => (d?.status === 2 ? d?.forwarded_to?.first_name : ""))}</h5>
            <h5 className="text-secondary">Checked By</h5>
          </Col>
          <Col md={4}>
            <h5 className="mb-1">{data?.invoice?.map((d) => d?.approved_by?.first_name)}</h5>
            <h5 className="text-secondary">Approved By</h5>
          </Col>
        </Row>
      </div>
    </div>
  );
}

//<div style={{ borderBottom: "1px solid #666" }}>
// <Row>
// <Col md={2}>
//       <h3 className="mb-2 text-start">Date</h3>
//     </Col>
//     <Col md={7}>
//       <h3 className="mb-2 text-center">Particulars</h3>
//     </Col>
//     <Col md={3}>
//       <h3 className="mb-2 text-end">Amount</h3>
//     </Col>
//   </Row>
// </div>
{
  /* <div style={{ borderBottom: "1px solid #666" }}>
  {data?.invoice_items?.map((d) => (
    <Row className="mt-2">
      <Col className="text-start" md={2}>
        <h4 className="px-1">{moment(d?.date).format("DD-MM-YYYY")}</h4>
      </Col>
      <Col md={7}>
        <h4 className="text-start">{d?.description}</h4>
      </Col>
      <Col className="text-end" md={3}>
        <h4>{d?.cost}</h4>
      </Col>
    </Row>
  ))}
</div>; */
}
