import React, { useState } from "react";

const prices = { adult: 2500, student: 2000, senior: 1800 };

export default function TicketSelector({ onChange }) {
  const [counts, setCounts] = useState({ adult: 0, student: 0, senior: 0 });

  const handleChange = (type, delta) => {
    setCounts(prev => {
      const val = Math.max(0, (prev[type] || 0) + delta);
      const updated = { ...prev, [type]: val };
      onChange && onChange(updated);
      return updated;
    });
  };

  return (
    <div className="mb-4">
      <h5>Jegytípusok</h5>
      <div className="d-flex gap-3">
        {Object.entries(prices).map(([type, price]) => (
          <div key={type} className="d-flex flex-column align-items-center">
            <span className="fw-semibold text-capitalize">{type}</span>
            <span className="text-muted small mb-2">{price} Ft</span>
            <div>
              <button className="btn btn-sm btn-outline-primary me-1" onClick={() => handleChange(type, -1)}>-</button>
              <span className="mx-2">{counts[type]}</span>
              <button className="btn btn-sm btn-outline-primary ms-1" onClick={() => handleChange(type, 1)}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}