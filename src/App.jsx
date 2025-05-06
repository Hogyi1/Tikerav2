import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MovieDetails from "./components/MovieDetails";
import BookingPanel from "./components/BookingPanel";
import MovieCard from "./components/MovieCard";
import movieData from "./assets/movies.json";

const dayMap = {
  Monday: "Hétfő",
  Tuesday: "Kedd",
  Wednesday: "Szerda",
  Thursday: "Csütörtök",
  Friday: "Péntek",
  Saturday: "Szombat",
  Sunday: "Vasárnap",
};

export default function App() {
  const todayHungarian =
    dayMap[
      new Date().toLocaleDateString("en-US", { weekday: "long" })
    ] || "Hétfő";
  const [selectedDay, setSelectedDay] = useState(todayHungarian);
  const [groupedByDay, setGroupedByDay] = useState({});
  const [selectedMovieGroup, setSelectedMovieGroup] = useState(null);
  const [selectedScreening, setSelectedScreening] = useState(null);

  // napváltáskor frissül a jobb oldali panel
  useEffect(() => {
    setSelectedMovieGroup(null);
    setSelectedScreening(null);
  }, [selectedDay]);

  // filmes adatok betöltése és csoportosítása napokra
  useEffect(() => {
    const grouping = {};
    movieData.forEach((movie) => {
      movie.screenings.forEach((screen) => {
        const hung = dayMap[screen.weekday];
        if (!grouping[hung]) grouping[hung] = [];
        grouping[hung].push({ ...movie, ...screen });
      });
    });
    setGroupedByDay(grouping);
  }, []);

  const screenings = groupedByDay[selectedDay] || [];
  const uniqueMovies = Object.values(
    screenings.reduce((acc, s) => {
      if (!acc[s.title]) acc[s.title] = s;
      return acc;
    }, {})
  );

  return (
    <>
      <Navbar selectedDay={selectedDay} onSelectDay={setSelectedDay} />

      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="row g-3">
              {uniqueMovies.map((m, idx) => (
                <MovieCard
                  key={idx}
                  movie={m}
                  onSelect={(movie) => {
                    setSelectedMovieGroup(movie);
                    setSelectedScreening(null);
                  }}
                  isSelected={selectedMovieGroup?.title === m.title}
                />
              ))}
            </div>
          </div>

          <div className="col-12 col-lg-6">
            {selectedMovieGroup && (
              <MovieDetails
                movie={selectedMovieGroup}
                screenings={screenings.filter(
                  (s) => s.title === selectedMovieGroup.title
                )}
                selected={selectedScreening}
                onSelect={setSelectedScreening}
              />
            )}
            <BookingPanel screening={selectedScreening} day={selectedDay} />
          </div>
        </div>
      </div>
    </>
  );
}