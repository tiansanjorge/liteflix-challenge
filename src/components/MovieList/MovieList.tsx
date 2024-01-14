import { useState } from "react";
import { useMedia } from "react-use";
import usePopularMovies from "../../helpers/usePopularMovies";
import useMyMovies from "../../helpers/useMyMovies";
import "./MovieList.scss";

const MovieList: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showPopularMovies, setShowPopularMovies] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("POPULARES");
  const [isPopularMoviesSelected, setIsPopularMoviesSelected] =
    useState<boolean>(true);
  const [isMyMoviesSelected, setIsMyMoviesSelected] = useState<boolean>(false);

  const popularMovies: Movie[] = usePopularMovies();
  const myMovies: Movie[] = useMyMovies();

  interface Movie {
    id?: number;
    title?: string;
    release_date?: string;
    vote_average?: number;
    backdrop_path?: string;
    name?: string;
    image?: string;
  }

  const toggleDropdown = (): void => {
    setShowDropdown(!showDropdown);
  };

  const handlePopularMoviesClick = (): void => {
    setShowPopularMovies(true);
    setShowDropdown(false);
    setCategory("POPULARES");
    setIsPopularMoviesSelected(true);
    setIsMyMoviesSelected(false);
  };

  const handleMyMoviesClick = (): void => {
    setShowPopularMovies(false);
    setShowDropdown(false);
    setCategory("MIS PELÍCULAS");
    setIsMyMoviesSelected(true);
    setIsPopularMoviesSelected(false);
  };

  const movies: Movie[] = showPopularMovies ? popularMovies : myMovies;
  const screenSize = useMedia("(min-width: 826px) and (max-width: 1100px)");
  const moviesToDisplay: Movie[] = movies
    ? screenSize
      ? movies.slice(0, 6)
      : movies.slice(0, 4)
    : popularMovies.slice(0, 4);

  return (
    <div className="movie-list">
      <button className="popular-link" onClick={toggleDropdown}>
        VER:{" "}
        <b>
          <b>{category}</b>
        </b>
        <img
          src="img/arrow.png"
          alt="Dropdown Menu"
          className="dropdown-arrow"
        />
      </button>
      {showDropdown && (
        <div className="dropdown-options">
          <div className="dropdown-option-container">
            <p
              className="dropdown-option option-popular-movies"
              onClick={handlePopularMoviesClick}
            >
              {isPopularMoviesSelected ? (
                <b>
                  <b>POPULARES</b>
                </b>
              ) : (
                "POPULARES"
              )}
            </p>
            <img
              src="img/vector.png"
              alt="selected"
              className={
                isPopularMoviesSelected ? "vector d-block" : "vector d-none"
              }
            />
          </div>

          <div className="dropdown-option-container">
            <p
              className="dropdown-option option-my-movies"
              onClick={handleMyMoviesClick}
            >
              {isMyMoviesSelected ? (
                <b>
                  <b>MIS PELICULAS</b>
                </b>
              ) : (
                "MIS PELICULAS"
              )}
            </p>
            <img
              src="img/vector.png"
              alt="selected"
              className={
                isMyMoviesSelected ? "vector d-block" : "vector d-none"
              }
            />
          </div>
        </div>
      )}
      <div className="movie-thumbnails">
        {moviesToDisplay.map((movie: Movie, index: number) => {
          const isLastMovie = index === moviesToDisplay.length - 1;
          const isFirstMovie = index === 0;
          const thumbnailClass = isFirstMovie
            ? "first-movie-thumbnail"
            : isLastMovie
            ? "last-movie-thumbnail"
            : "movie-thumbnail";

          return (
            <div key={index} className={thumbnailClass}>
              <img
                src={
                  showPopularMovies
                    ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                    : movie.image
                }
                alt={showPopularMovies ? movie.title : movie.name?.slice(0, -4)}
                className="thumbnail-image"
              />
              <div className="thumbnail-overlay">
                <div className="play-title">
                  <div
                    className="list-play-button"
                  />
                  <p className="movie-title">
                    {showPopularMovies ? movie.title : movie.name?.slice(0, -4)}
                  </p>
                </div>
                <div className={showPopularMovies ? "rating-release" : "d-none"}>
                  <div className="rating">
                    <img src="img/star.png" alt="rating" className="star" />
                    <p className="m-0">
                    {movie.vote_average?.toFixed(1)}
                    </p>
                  </div>
                  <div className="release">
                    {movie.release_date?.slice(0, -6)}
                  </div>
                </div>

                <div className="thumbnail-gradient-overlay" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieList;
