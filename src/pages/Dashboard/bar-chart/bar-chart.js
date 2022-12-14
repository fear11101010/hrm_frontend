import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function BarChart() {
  const currYear = new Date().getFullYear();
  let real_data = data[0]?.kpi_data[0]?.kpi_value_data;
  console.log(real_data);
  return (
    <div>
      <Card className="shadow-sm border" style={{ fontSize: "13px" }}>
        <Card.Header className="mb-0 d-flex justify-content-between ">
          <h4 className="mb-0">KPI Value</h4>
          <Form>
            <Form.Select aria-label="Default select example" size="sm">
              <option>{currYear}</option>
              <option>{currYear - 1}</option>
              <option>{currYear - 2}</option>
            </Form.Select>
          </Form>
        </Card.Header>
        <Card.Body>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart layout="vertical" width={500} height={400} data={real_data}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis />
              <YAxis dataKey="kpi_value_name" type="category" scale="band" />
              <Tooltip /> <Legend />
              <Bar dataKey="value" barSize={20} fill="#413ea0" />
              <Line dataKey="value" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    </div>
  );
}

const data = [
  {
    id: 1,
    name: "Role Model",
    value: 3,
  },
  {
    id: 2,
    name: "Very Good",
    value: 1,
  },
  {
    id: 3,
    name: "Good",
    value: 0,
  },
  {
    id: 4,
    name: "Improvement Required",
    value: 0,
  },
  {
    id: 5,
    name: "Unacceptable",
    value: 0,
  },
];
