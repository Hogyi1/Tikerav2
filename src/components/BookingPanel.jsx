import React, { useState, useEffect } from "react";
import TicketSelector from "./TicketSelector";
import SeatMap from "./SeatMap";

const PRICES = { adult: 2500, student: 2000, senior: 1800 };

/**
 * BookingPanel komponens
 */
export default function BookingPanel({ screening, day }) {
  const [selectedTickets, setSelectedTickets] = useState({
    adult: 0,
    student: 0,
    senior: 0,
  });
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    setSelectedSeats([]);
  }, [screening?.id, screening?.start_time]);

  if (!screening) {
    return (
      <div className="border rounded p-3" style={{ minHeight: "400px" }}>
        <p className="text-center text-muted">
          Válassz vetítést a részletekben!
        </p>
      </div>
    );
  }

  const {
    adult: adultCount,
    student: studentCount,
    senior: seniorCount,
  } = selectedTickets;
  const ticketCount = adultCount + studentCount + seniorCount;
  const totalPrice =
    adultCount * PRICES.adult +
    studentCount * PRICES.student +
    seniorCount * PRICES.senior;
  const { bookings = [], room, start_time, title } = screening;
  const bookedSeats = bookings.map((b) => `${b.row}-${b.seat}`);
  const availableSeats = room.rows * room.seatsPerRow - bookings.length;

  return (
    <div className="border rounded p-3" style={{ minHeight: "400px" }}>
      <h5 className="mb-3">
        {title} - {start_time}
      </h5>
      <p className="mb-2">
        <strong>Szabad helyek:</strong> {availableSeats}
      </p>
      <TicketSelector onChange={setSelectedTickets} />

      <h6 className="mb-2">Válassz ülőhelyet!</h6>

      <div
        className="d-flex align-items-center mb-3"
        style={{ fontSize: "0.9rem" }}
      >
        <div className="d-flex align-items-center me-4">
          <span
            className="d-inline-block border"
            style={{
              width: "16px",
              height: "16px",
              backgroundColor: "#F8F9FA",
              marginRight: "6px",
            }}
          />
          Szabad
        </div>
        <div className="d-flex align-items-center me-4">
          <span
            className="d-inline-block"
            style={{
              width: "16px",
              height: "16px",
              backgroundColor: "#6C757D",
              marginRight: "6px",
            }}
          />
          Foglalt
        </div>
        <div className="d-flex align-items-center">
          <span
            className="d-inline-block"
            style={{
              width: "16px",
              height: "16px",
              backgroundColor: "#167347",
              marginRight: "6px",
            }}
          />
          Kiválasztott
        </div>
      </div>

      <SeatMap
        key={`${screening.id}-${screening.start_time}`}
        rows={room.rows}
        seatsPerRow={room.seatsPerRow}
        selectedCount={ticketCount}
        bookedSeats={bookedSeats}
        onChange={setSelectedSeats}
      />
      <p className="mb-3" style={{ fontSize: "0.9rem" }}>
        Kiválasztott helyek: {selectedSeats.join(", ") || "-"}
      </p>

      <hr />
      <div className="mb-3">
        <h6>Foglalásod részletei</h6>
        <br />
        <p>
          <strong>Vetítés:</strong> {title} - {day}, {start_time}
        </p>
        <p>
          <strong>Jegyek:</strong>
          <br />
          Felnőtt: {adultCount} x {PRICES.adult} Ft ={" "}
          {adultCount * PRICES.adult} Ft
          <br />
          Diák: {studentCount} x {PRICES.student} Ft ={" "}
          {studentCount * PRICES.student} Ft
          <br />
          Nyugdíjas: {seniorCount} x {PRICES.senior} Ft ={" "}
          {seniorCount * PRICES.senior} Ft
        </p>
        <p>
          <strong>Kiválasztott helyek:</strong>{" "}
          {selectedSeats.join(", ") || "-"}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <p style={{ fontWeight: 600 }}>Végösszeg: {totalPrice} Ft</p>
          <button
            className="btn btn-success"
            disabled={totalPrice === 0 || selectedSeats.length !== ticketCount}
          >
            Foglalás véglegesítése
          </button>
        </div>
      </div>
    </div>
  );
}
