import React, { useState } from "react";
import Content from "../components/content/Content";
import Layout from "../layout/Layout";
import moment from "moment";
import PageHeader from "../components/header/PageHeader";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { Decrypt, Encrypt, _Decode } from "../utils/Hash";
import FileUpload from "./hrm/Configuration/file-upload/FileUpload";
var CryptoJS = require("crypto-js");

export function Test(props) {
  const [a, setA] = useState(false);
}

export default function Demo() {
  const [date, setDate] = useState(new Date());

  // // encoded.iv.clamp();
  // console.log("key", encoded.key.toString(CryptoJS.enc.Base64));
  // console.log("iv", encoded.iv.toString(CryptoJS.enc.Base64));
  // console.log("ct", encoded.ciphertext.toString(CryptoJS.enc.Base64));
  // console.log("ct", encoded);
  // console.log("dec", decoded.toString(CryptoJS.enc.Utf8));

  // console.log(
  //   _Decode(
  //     "7a9c5f5b09b9d75c3bfb0f0f01c08cc7389acea5d03fab89678b5c3882eed76bf67990097bb890915600f6e42e10201f16897e1a7ebf6c997c6d67cf242bf3131a6a584b1b3cc72c8e0246915205e622f95ab42633552460cdfec009b84c257bd21c61965ef55696e70bfdb3e322d6fbc2ceb2cbefb8f44046d3d50a1a8cfa37ff036c59677af8834e9709cfac264bb412a2a1e9b271216929f1c6bcee39e2c8cf0bc6ae69ae0d533fadbed7df773b5a2ec97414026689afcd31c3f31a22476b1c755461f26612b84cfe58749ea952853007a8508bc603458259aaeb46b44cb99e52b5cb33f8dd1c8257ee103bba31aac1d43ee37dcf6f3f5b8ac3d5b271d57fc61c67b72be15aa22f6605b4495d9c8d3baae9c87a03295bcb4e39c727e82ebca7837de278394342f2eba41334b73df9b0ac862fa212558c723808ac7480b224231ead624825965c1a740b4b13316967eecaf32c550b5087d484a9abbd028a377e61849907794cb66f8361147e175e42de47a0c8d34957787566c2b3e77d68a993aff5a6eba9c12cb3c90b5a3cad6a2dbbe07e096ced39b175b0278d9e5cd0d9844577fc3de4c95dac702f9f57af475927ccfee110047d564f8a4620228e7255ae63ca3e3505accb8af2f77db5503bf28091139aaa4ad9e60ac533e9830fe4c7cc447b2c1bd95d4fe6f624d38cb43bc562f3a83b8112db1b246811c414e20261c7a1fbcb8edb029562f040555b6a249d62382817b9a988e56f5d9203373e8cf34449bbac85b0f7a95fa2cbdb8ec404722835ee030a5a8134074ecbba9aac7eec6c9786f9b2f61a838127bddc7e62c5dd00622840ae9e8547d87f7775919a7b077dd2dff08f011e1802c3bf9d70f51b112290fe3147a3e60272186f53c45e7b7fa83ab4db444835f0d20d5bc0c8aa4f8051a1fb0c471cbbf9ceed55551a8e11d33998ac636384472cf46ddcb02af62576c038b99a87628ddce149bdfdd52c8a0fef29b9796d985cbac87470e48af62ee09b395d1fcc5fd8feff69feea19130c2d79abab1f4a83bdb54b0aa64a96d12273375b65b6fc7535a19ae6b9289a6b7ff7250387bb2111b66752e958df740edac4296b4d70455179aae8bf5c5a406fc12b59beec89dc71dd07160c28edb6b72ca7aee3b10aede9ba28df9868266a8734f0152ac2c3767c397fb9e0029b910294f174fcf4c189be86f2ee8c01e28b4ba698"
  //   )
  // );

  return (
    <>
      <Layout>
        <PageHeader />
        <Content></Content>
      </Layout>
    </>
  );
}

// import React, { useEffect, useState } from "react";
// import { Button, Form } from "react-bootstrap";
// import ReactSelect from "react-select";
// import { error_alert } from "../../../components/alert/Alert";
// import Content from "../../../components/content/Content";
// import ExcelPdfPrint from "../../../components/excel-pdf-print/ExcelPdfPrint";
// import PageHeader from "../../../components/header/PageHeader";
// import Loader from "../../../components/loader/Loader";
// import Table from "../../../components/table/Table";
// import useFetch from "../../../hooks/useFetch";
// import Layout from "../../../layout/Layout";
// import { SBU_ASSESTMENT_REPORT_GET, SUPERVISOR_BY_SBU } from "../../../utils/API_ROUTES";
// import { API } from "../../../utils/axios/axiosConfig";
// import { YEAR_RANGE } from "../../../utils/CONSTANT";
// import { USER_INFO } from "../../../utils/session/token";
// import { SBU_ASSESTMENT_REPORT_EXCEL_COLUMN } from "../excel-columns";
// import { SBU_ASSESTMENT_REPORT_TABLE_COLUMN } from "../table-columns";

// export default function SbuAssestmentData() {
//   const user = USER_INFO();
//   const [loading, setLoading] = useState(false);
//   const [year, setYear] = useState("");
//   const [data, setData] = useState([]);
//   const [supervisorList, setSupervisor_list] = useState([]);
//   const [selected_supervisor, setSelected_supervisor] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (year === "") {
//       error_alert("Please select year");
//     } else {
//       setData([]); //for safe
//       setLoading(true);
//       const payload = {
//         year: year,
//         supervisor: selected_supervisor,
//       };
//       API.post(SBU_ASSESTMENT_REPORT_GET, payload)
//         .then((res) => {
//           if (res.data.statuscode === 200) {
//             setData(res?.data?.data);
//             if (res.data.data.length === 0) {
//               error_alert("No data found");
//               setData([]);
//             }
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//   };

//   useEffect(() => {
//     setLoading(true);
//     API.get(SUPERVISOR_BY_SBU)
//       .then((res) => {
//         setSupervisor_list(res.data?.data?.map((v, i) => ({ label: v.name, value: v.id })));
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <Layout>
//       {loading && <Loader />}
//       <PageHeader title={"SBU Assestment Report"} />
//       <Content>
//         <Form className="m-auto w-50 mb-3" onSubmit={handleSubmit}>
//           <Form.Group className="mb-4">
//             <Form.Label className="mb-0">Select Year</Form.Label>
//             <ReactSelect
//               options={YEAR_RANGE}
//               onChange={(e) => {
//                 setYear(e.value);
//               }}
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label className="mb-0">Select Supervisor</Form.Label>
//             <ReactSelect
//               options={supervisorList}
//               onChange={(e) => {
//                 setSelected_supervisor(e.value);
//               }}
//             />
//           </Form.Group>
//           <Button type="submit">Search</Button>
//         </Form>
//         {data.length > 0 && (
//           <>
//             <hr />
//             <div className="text-end">
//               <ExcelPdfPrint
//                 exportPdf={false}
//                 print={false}
//                 header="SBU Assestment Report"
//                 data={data}
//                 columns={SBU_ASSESTMENT_REPORT_EXCEL_COLUMN}
//               />
//             </div>
//             <Table dense columns={SBU_ASSESTMENT_REPORT_TABLE_COLUMN} data={data} />
//           </>
//         )}
//       </Content>
//     </Layout>
//   );
// }
