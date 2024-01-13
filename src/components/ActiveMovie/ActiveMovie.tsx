import React from "react";
import "./ActiveMovie.scss";

interface ActiveMovieProps {
  title: string;
}

const ActiveMovie: React.FC<ActiveMovieProps> = ({ title }) => {
  const isTitleLong = title.length > 24;

  return (
    <div className="active-movie-container">
      <p className="liteflix-original">
        ORIGINAL DE <b><b>LITEFLIX</b></b>
      </p>
      <h1 className={`active-movie-title ${isTitleLong ? 'movie-title-reduced' : ''}`}>
        {title}
      </h1>
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
