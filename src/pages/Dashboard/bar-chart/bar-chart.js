import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function BarChart() {
  const currYear = new Date().getFullYear();
  return (
    <div>
      <Card className="shadow-sm border">
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
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart width={"100%"} data={data} layout="horizontal">
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  borderRadius: "4px",
                  border: "1px solid #666",
                }}
              />
              <Bar dataKey="value" label={{ fill: "white" }} fill="#2C7BE5" barSize={30} />
              <Line type="monotone" dataKey="value" stroke="#e74c3c" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    </div>
  );
}

const data = [
  {
    name: "Role Model",
    value: 67,
    // pv: 800,
    amt: 1400,
  },
  {
    name: "Very Good",
    value: 50,
    // pv: 800,
    amt: 1400,
  },
  {
    name: "Good",
    value: 34,
    // pv: 800,
    amt: 1400,
  },
  {
    name: "Improvement",
    value: 48,
    // pv: 800,
    amt: 1400,
  },
];
