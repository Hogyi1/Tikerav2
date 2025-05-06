import React, { useEffect } from "react";

/**
 * DayTabs komponens – napi lapfülek előre/hátra gombbal (magyar napok)
 */
export default function DayTabs({ selectedDay, onSelectDay }) {
  const days = ["Hétfő","Kedd","Szerda","Csütörtök","Péntek","Szombat","Vasárnap"];

  // Ha a kiválasztott nap nem szerepel, állítsuk az első napra mountkor
  const validDay = days.includes(selectedDay) ? selectedDay : days[0];
  useEffect(() => {
    if (!days.includes(selectedDay)) {
      onSelectDay(validDay);
    }
  }, []);

  const currentIndex = days.indexOf(validDay);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + days.length) % days.length;
    onSelectDay(days[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % days.length;
    onSelectDay(days[nextIndex]);
  };

  return (
    <div className="d-flex align-items-center gap-2">
      <button className="btn btn-outline-secondary btn-sm" onClick={handlePrev} aria-label="Előző nap">&lt;</button>
      <ul className="nav nav-pills flex-nowrap overflow-auto mb-0">
        {days.map(day => (
          <li className="nav-item" key={day}>
            <button
              className={`nav-link px-3 py-2 ${validDay === day ? 'active bg-primary text-white' : 'text-secondary bg-light'}`}
              onClick={() => onSelectDay(day)}
            >
              {day}
            </button>
          </li>
        ))}
      </ul>
      <button className="btn btn-outline-secondary btn-sm" onClick={handleNext} aria-label="Következő nap">&gt;</button>
    </div>
  );
}
