import { useState, useEffect } from "react";
import useActiveMovie from "../../helpers/useActiveMovie";
import "./AppContainer.scss";
import Header from "../DesktopHeader/DesktopHeader";
import ActiveMovie from "../ActiveMovie/ActiveMovie";
import MovieList from "../MovieList/MovieList";

const AppContainer: React.FC = () => {
  const { movies, loading, error } = useActiveMovie();

  if (loading) {
    return (
      <p className="loading-message">
        LITE<span>FLIX</span>
      </p>
    );
  }

  if (error || movies.length === 0) {
    return (
      <p className="loading-message">
        Unexpected error, <span>please contact support.</span>
      </p>
    );
  }

  const movieBackground = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${movies[1].backdrop_path})`,
  };

  return (
    <div className="app-container">
      <div className="content-container">
        <Header />
        <div className="body">
          <ActiveMovie title={movies[1].title} />
          <MovieList />
        </div>
      </div>
      <div className="background-image" style={movieBackground}>
        <div className="gradient-overlay" />
      </div>
    </div>
  );
};

export default AppContainer;
