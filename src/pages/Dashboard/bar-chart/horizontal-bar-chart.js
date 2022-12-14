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

export default function HorizontalBarGraph({ title, data }) {
  const currYear = new Date().getFullYear();
  return (
    <Card className="shadow-sm border">
      <Card.Header>
        <h4 className="mb-0">{title}</h4>
        {/* <Form>
          <Form.Select aria-label="Default select example" size="sm">
            <option>{currYear}</option>
            <option>{currYear - 1}</option>
            <option>{currYear - 2}</option>
          </Form.Select>
        </Form> */}
      </Card.Header>
      <Card.Body style={{ fontSize: "13px" }}>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart width={"100%"} data={data}>
            <XAxis dataKey={"sbu_name"} />
            <YAxis dataKey={"sbu_pct"} />
            <Tooltip
              contentStyle={{
                borderRadius: "4px",
                border: "1px solid #666",
              }}
            />
            <Bar dataKey="sbu_pct" fill="#2C7BE5" barSize={10} />
          </ComposedChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
}
