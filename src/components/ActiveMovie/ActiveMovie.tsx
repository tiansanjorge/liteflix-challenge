import React from "react";
import "./ActiveMovie.scss";

interface ActiveMovieProps {
  title: string;
}

const ActiveMovie: React.FC<ActiveMovieProps> = ({ title }) => {
  const isTitleLong = title.length > 24;

  return (
    <div className="active-movie">
      <p className="active-movie__liteflix-original">
        ORIGINAL DE <b><b>LITEFLIX</b></b>
      </p>
      <h1 className={`active-movie__title ${isTitleLong ? 'active-movie__title-reduced' : ''}`}>
        {title}
      </h1>
      <div className="active-movie__buttons">
        <button className="active-movie__play-button">
          <img src="img/play.png" alt="play" className="active-movie__play-icon" />
          REPRODUCIR
        </button>
        <button className="active-movie__add-to-list-button">
          <img src="img/plus.png" alt="plus" className="active-movie__plus-icon" />
          MI LISTA
        </button>
      </div>
    </div>
  );
};

export default ActiveMovie;
