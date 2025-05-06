import React from "react";

export default function MovieCard({ movie, onSelect }) {
  return (
    <div className="card h-100 shadow border-0">
      <img
        src={`/src/assets/images/${movie.image}`}
        className="card-img-top"
        alt={movie.title}
        style={{ height: '220px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-semibold">{movie.title}</h5>
        <p className="mb-2 text-muted small">
          <span className="badge bg-info me-2">{movie.genre}</span>
          <span className="badge bg-secondary">{movie.duration} min</span>
        </p>
        <button className="btn btn-outline-primary mt-auto" onClick={() => onSelect(movie)}>
          Részletek
        </button>
      </div>
    </div>
  );
}