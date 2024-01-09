import React from "react";
import "./ActiveMovie.scss";

interface ActiveMovieProps {
  title: string;
}

const ActiveMovie: React.FC<ActiveMovieProps> = ({ title }) => {
  return (
    <div className="activeMovieContainer">
      <p className="liteflix-original">
        ORIGINAL DE <b>LITEFLIX</b>
      </p>
      <h1 className="movieTitle">{title}</h1>

      <div className="buttons">
        <button className="main-play-button">
          <img src="img/play.png" alt="play" className="main-play-icon" />
          REPRODUCIR
        </button>
        <button className="add-to-list-button">
          <img src="img/plus.png" alt="plus" className="main-plus-icon" />
          MI LISTA
        </button>
      </div>
    </div>
  );
};

export default ActiveMovie;
