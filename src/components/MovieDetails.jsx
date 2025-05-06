import React from "react";

/**
 * MovieDetails komponens
 */
export default function MovieDetails({
  movie,
  screenings = [],
  selected,
  onSelect,
}) {
  return (
    <div className="border rounded p-3 mb-4">
      <div className="row g-3 align-items-start">
        <div className="col-auto">
          <img
            src={`/src/assets/images/${movie.image}`}
            alt={movie.title}
            className="img-fluid rounded"
            style={{ width: 150, height: 200, objectFit: "cover" }}
          />
        </div>

        <div className="col">
          <h4 className="mb-2">
            {movie.title}{" "}
            <small className="text-muted">({movie.release_year})</small>
          </h4>
          <p className="mb-3" style={{ fontSize: "1rem" }}>
            {movie.description}
          </p>
          <div
            className="btn-group btn-group-sm"
            role="group"
            aria-label="Vetítési időpontok"
          >
            {screenings
              .slice()
              .sort((a, b) => a.start_time.localeCompare(b.start_time))
              .map((s) => (
                <button
                  key={s.id}
                  className={`btn ${
                    selected && selected.id === s.id
                      ? "btn-success"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => onSelect(s)}
                >
                  {s.start_time}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
// import React, { useState } from "react";
// import TicketSelector from "./TicketSelector";
// import SeatMap from "./SeatMap";
// import BookingPanel from "./BookingPanel";

// export default function MovieDetails({ movie, screenings = [], selected, onSelect }) {
//   const [ticketCounts, setTicketCounts] = useState({ adult: 0, student: 0, senior: 0 });
//   const [selectedSeats, setSelectedSeats] = useState([]);

//   // Total seats allowed = sum of tickets
//   const maxSeats = Object.values(ticketCounts).reduce((a, b) => a + b, 0);

//   return (
//     <div className="border rounded p-3 mb-4 shadow-sm bg-white">
//       <div className="row g-3 align-items-start">
//         <div className="col-auto">
//           <img
//             src={`/src/assets/images/${movie.image}`}
//             alt={movie.title}
//             className="img-fluid rounded"
//             style={{ width: 150, height: 200, objectFit: "cover" }}
//           />
//         </div>
//         <div className="col">
//           <h4 className="mb-2">
//             {movie.title} <small className="text-muted">({movie.release_year})</small>
//           </h4>
//           <p className="mb-3" style={{ fontSize: "1rem" }}>
//             {movie.description}
//           </p>

//           {/* Vetítési időpontok */}
//           <div className="btn-group btn-group-sm mb-3" role="group">
//             {screenings
//               .slice()
//               .sort((a, b) => a.start_time.localeCompare(b.start_time))
//               .map((s) => (
//                 <button
//                   key={s.id}
//                   className={`btn ${
//                     selected && selected.id === s.id
//                       ? "btn-success"
//                       : "btn-outline-secondary"
//                   }`}
//                   onClick={() => onSelect(s)}
//                 >
//                   {s.start_time}
//                 </button>
//               ))}
//           </div>

//           {/* Jegytípus választó */}
//           {selected && (
//             <TicketSelector onChange={setTicketCounts} />
//           )}

//           {/* Ülésválasztó */}
//           {selected && maxSeats > 0 && (
//             <SeatMap
//               room={selected.room}
//               bookings={selected.bookings}
//               selectedSeats={selectedSeats}
//               onToggle={(seat) => {
//                 setSelectedSeats((prev) => {
//                   const exists = prev.some(
//                     (s) => s.row === seat.row && s.seat === seat.seat
//                   );
//                   if (exists) return prev.filter((s) => !(s.row === seat.row && s.seat === seat.seat));
//                   if (prev.length < maxSeats) return [...prev, seat];
//                   return prev;
//                 });
//               }}
//             />
//           )}

//           {/* Foglalás összesítő */}
//           {selected && (
//             <BookingPanel
//               movie={movie}
//               screening={selected}
//               tickets={ticketCounts}
//               seats={selectedSeats}
//               total={Object.entries(ticketCounts).reduce(
//                 (sum, [type, num]) =>
//                   sum + num * ({ adult:2500, student:2000, senior:1800 }[type]),
//                 0
//               )}
//               onConfirm={() => alert("Foglalás sikeresen elküldve!")}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
