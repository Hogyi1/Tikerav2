import React from "react";
import DayTabs from "./DayTabs";

export default function Navbar({ selectedDay, onSelectDay }) {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm rounded mb-4 py-3">
      <div className="container-fluid">
        <a className="navbar-brand text-primary fw-bold fs-3" href="#">
          🎬 Tikera
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarDays"
          aria-controls="navbarDays"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarDays">
          <DayTabs selectedDay={selectedDay} onSelectDay={onSelectDay} />
        </div>
      </div>
    </nav>
  );
}