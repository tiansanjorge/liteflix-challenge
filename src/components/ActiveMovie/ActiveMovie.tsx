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
        <button className="play-button">
          <img src="img/play.png" alt="play" className="play-icon" />
          REPRODUCIR
        </button>
        <button className="add-to-list-button">
          <img src="img/plus.png" alt="plus" className="plus-icon" />
          MI LISTA
        </button>
      </div>
    </div>
  );
};

export default ActiveMovie;
