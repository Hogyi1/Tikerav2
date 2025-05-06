import React, { useState, useEffect } from "react";

/**
 * SeatMap komponens
 */
export default function SeatMap({
  rows,
  seatsPerRow,
  selectedCount,
  bookedSeats = [],
  onChange,
}) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    setSelectedSeats([]);
  }, [selectedCount]);

  useEffect(() => {
    onChange(selectedSeats);
  }, [selectedSeats, onChange]);

  const toggleSeat = (r, s) => {
    const id = `${r + 1}-${s + 1}`;
    if (bookedSeats.includes(id) || selectedCount === 0) return;
    setSelectedSeats((prev) =>
      prev.includes(id)
        ? prev.filter((sid) => sid !== id)
        : prev.length < selectedCount
        ? [...prev, id]
        : prev
    );
  };

  return (
    <div className="seat-map mb-3">
      {Array.from({ length: rows }).map((_, r) => (
        <div
          className="d-flex align-items-center justify-content-center mb-1"
          key={r}
        >
          <div
            className="row-label me-3 text-muted"
            style={{ width: "24px", textAlign: "right" }}
          >
            {r + 1}
          </div>
          <div className="d-flex">
            {Array.from({ length: seatsPerRow }).map((_, s) => {
              const id = `${r + 1}-${s + 1}`;
              const isBooked = bookedSeats.includes(id);
              const isSelected = selectedSeats.includes(id);
              const bgClass = isBooked
                ? "bg-secondary"
                : isSelected
                ? "bg-success"
                : "bg-light";
              const cursorStyle =
                isBooked || selectedCount === 0 ? "not-allowed" : "pointer";
              return (
                <div
                  key={s}
                  onClick={() => toggleSeat(r, s)}
                  className={`seat border me-1 ${bgClass}`}
                  style={{ width: "24px", height: "24px", cursor: cursorStyle }}
                  title={isBooked ? "Foglalt" : `Ülés ${id}`}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
