import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ReactSelect from "react-select";
import { error_alert } from "../../../../components/alert/Alert";
import Content from "../../../../components/content/Content";
import ExcelPdfPrint from "../../../../components/excel-pdf-print/ExcelPdfPrint";
import PageHeader from "../../../../components/header/PageHeader";
import Loader from "../../../../components/loader/Loader";
import Table from "../../../../components/table/Table";
import useFetch from "../../../../hooks/useFetch";
import Layout from "../../../../layout/Layout";
import { SBU_ASSESTMENT_REPORT_GET, SUPERVISOR_BY_SBU } from "../../../../utils/routes/api_routes/API_ROUTES";
import { API } from "../../../../utils/axios/axiosConfig";
import { YEAR_RANGE } from "../../../../utils/CONSTANT";
import { USER_INFO } from "../../../../utils/session/token";
import { SBU_ASSESTMENT_REPORT_EXCEL_COLUMN } from "../excel-columns";
import { SBU_ASSESTMENT_REPORT_TABLE_COLUMN } from "../table-columns";
import { Navigate } from "react-router-dom";
import { UNAUTHORIZED } from "../../../../utils/routes/app_routes/APP_ROUTES";

export default function SbuAssestmentData() {
  const user = USER_INFO();
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState("");
  const [data, setData] = useState([]);
  const [supervisorList, setSupervisor_list] = useState([]);
  const [selected_supervisor, setSelected_supervisor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (year === "") {
      error_alert("Please select year");
    } else {
      setData([]); //for safe
      setLoading(true);
      const payload = {
        year: year,
        supervisor: selected_supervisor,
      };
      API.post(SBU_ASSESTMENT_REPORT_GET, payload)
        .then((res) => {
          if (res.data.statuscode === 200) {
            setData(res?.data?.data);
            if (res.data.data.length === 0) {
              error_alert("No data found");
              setData([]);
            }
          }
        })
        .catch((err) => {
          console.log("errr");
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    setLoading(true);
    API.get(SUPERVISOR_BY_SBU)
      .then((res) => {
        setSupervisor_list(res.data?.data?.map((v, i) => ({ label: v.name, value: v.id })));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return user.accessibility.includes("SbuAssestmentReport") ? (
    <Layout>
      {loading && <Loader />}
      <PageHeader title={"SBU Assestment Report"} />
      <Content>
        <Form className="m-auto w-50 mb-3" onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="mb-0">Select Year</Form.Label>
            <ReactSelect
              options={YEAR_RANGE}
              onChange={(e) => {
                setYear(e.value);
              }}
            />
          </Form.Group>
          {user.group_id.split(",").includes("2") && (
            <Form.Group className="mb-3">
              <Form.Label className="mb-0">Select Supervisor</Form.Label>
              <ReactSelect
                options={supervisorList}
                onChange={(e) => {
                  setSelected_supervisor(e.value);
                }}
              />
            </Form.Group>
          )}
          <Button type="submit">Search</Button>
        </Form>
        {data.length > 0 && (
          <>
            <hr />
            <div className="text-end">
              <ExcelPdfPrint
                exportPdf={false}
                print={false}
                header="SBU Assestment Report"
                data={data}
                columns={SBU_ASSESTMENT_REPORT_EXCEL_COLUMN}
              />
            </div>
            <Table dense columns={SBU_ASSESTMENT_REPORT_TABLE_COLUMN} data={data} />
          </>
        )}
      </Content>
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}

// import React, { useEffect, useState } from "react";
// import { Form } from "react-bootstrap";
// import ReactSelect from "react-select";
// import { error_alert } from "../../../components/alert/Alert";
// import Content from "../../../components/content/Content";
// import ExcelPdfPrint from "../../../components/excel-pdf-print/ExcelPdfPrint";
// import PageHeader from "../../../components/header/PageHeader";
// import Loader from "../../../components/loader/Loader";
// import Table from "../../../components/table/Table";
// import Layout from "../../../layout/Layout";
// import { SBU_ASSESTMENT_REPORT_GET } from "../../../utils/API_ROUTES";
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

//   const fetchData = () => {
//     setLoading(true);
//     API.get(SBU_ASSESTMENT_REPORT_GET(year))
//       .then((res) => {
//         if (res.data.statuscode === 200) {
//           setData(res.data.data);
//           if (res.data.data.length === 0) {
//             error_alert("No data found");
//           }
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     if (year !== "") {
//       fetchData();
//     }
//   }, [year]);

//   return (
//     <Layout>
//       {loading && <Loader />}
//       <PageHeader title={"SBU Assestment Report"} />
//       <Content>
//         <Form className="m-auto w-50 mb-3">
//           <Form.Group>
//             <Form.Label>Select Year</Form.Label>
//             <ReactSelect
//               options={YEAR_RANGE}
//               onChange={(e) => {
//                 setYear(e.value);
//               }}
//             />
//           </Form.Group>
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
