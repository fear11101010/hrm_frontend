import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from "recharts";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChartCustom({ title, data }) {
  return (
    <Card>
      <Card.Header>
        <h4 className="mb-0">{title}</h4>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
}

const COLORS = ["#850000", "#E14D2A", "#2B3467", "#3E6D9C", "#533483"];
