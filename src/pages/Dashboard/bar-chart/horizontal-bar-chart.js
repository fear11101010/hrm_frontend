import React from "react";
import { Card, Form } from "react-bootstrap";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function HorizontalBarGraph() {
  const currYear = new Date().getFullYear();
  return (
    <Card className="shadow-sm border">
      <Card.Header>
        {" "}
        <h4 className="mb-0">Assestment Summary</h4>
        <Form>
          <Form.Select aria-label="Default select example" size="sm">
            <option>{currYear}</option>
            <option>{currYear - 1}</option>
            <option>{currYear - 2}</option>
          </Form.Select>
        </Form>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart width={"100%"} data={data}>
            <XAxis />
            <YAxis />
            <Tooltip
              contentStyle={{
                borderRadius: "4px",
                border: "1px solid #666",
              }}
            />
            <Bar dataKey="name" label fill="#2C7BE5" barSize={22} />
            <Line type="monotone" dataKey="value" stroke="#e74c3c" strokeWidth={2} />
          </ComposedChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
}

const data = [
  {
    name: "Role Model",
    value: 67,
  },
  {
    name: "Very Good",
    value: 50,
  },
  {
    name: "Good",
    value: 34,
  },
  {
    name: "Improvement",
    value: 48,
  },
  {
    name: "Role Model",
    value: 67,
  },
  {
    name: "Very Good",
    value: 50,
  },
  {
    name: "Good",
    value: 34,
  },
  {
    name: "Improvement",
    value: 48,
  },
  {
    name: "Role Model",
    value: 67,
  },
  {
    name: "Very Good",
    value: 50,
  },
  {
    name: "Good",
    value: 34,
  },
  {
    name: "Improvement",
    value: 48,
  },
  {
    name: "Role Model",
    value: 67,
  },
  {
    name: "Very Good",
    value: 50,
  },
  {
    name: "Good",
    value: 34,
  },
  {
    name: "Improvement",
    value: 48,
  },
  {
    name: "Improvement",
    value: 48,
  },
  {
    name: "Improvement",
    value: 48,
  },
  {
    name: "Improvement",
    value: 48,
  },
  {
    name: "Improvement",
    value: 48,
  },
];
