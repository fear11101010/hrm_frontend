import React from "react";

export default function StatusCard({ data, name }) {
  return (
    <div className="card border">
      <div className="card-body p-3">
        <h4 className="mb-1 text-secondary">{name}</h4>
        <h2 className="mb-0">{data}</h2>
      </div>
    </div>
  );
}
