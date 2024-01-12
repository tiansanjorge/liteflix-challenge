import { useState } from "react";
import usePopularMovies from "../../helpers/usePopularMovies";
import useMyMovies from "../../helpers/useMyMovies";
import "./MovieList.scss";

const MovieList: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showPopularMovies, setShowPopularMovies] = useState<boolean>(true);
  const [linkText, setLinkText] = useState<string>("POPULARES");
  const [isPopularMoviesSelected, setIsPopularMoviesSelected] = useState<boolean>(true);
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
    setLinkText("POPULARES");
    setIsPopularMoviesSelected(true);
    setIsMyMoviesSelected(false);
  };

  const handleMyMoviesClick = (): void => {
    setShowPopularMovies(false);
    setShowDropdown(false);
    setLinkText("MIS PELÍCULAS");
    setIsMyMoviesSelected(true);
    setIsPopularMoviesSelected(false);
  };

  const movies: Movie[] = showPopularMovies ? popularMovies : myMovies;

  return (
    <div className="movie-list">
      <button className="popular-link" onClick={toggleDropdown}>
        VER: <b>{linkText}</b>
        <img
          src="img/arrow.png"
          alt="Dropdown Menu"
          className="dropdown-arrow"
        />
      </button>
      {showDropdown && (
        <div className="dropdown-options">
          <p
            className="dropdown-option option-popular-movies"
            onClick={handlePopularMoviesClick}
          >
            POPULARES{" "}
            <img
              src="img/vector.png"
              alt="selected"
              className={
                isPopularMoviesSelected ? "vector d-block" : "vector d-none"
              }
            />
          </p>
          <p
            className="dropdown-option option-my-movies"
            onClick={handleMyMoviesClick}
          >
            MIS PELICULAS
            <img
              src="img/vector.png"
              alt="selected"
              className={
                isMyMoviesSelected ? "vector d-block" : "vector d-none"
              }
            />
          </p>
        </div>
      )}
      <div className="movie-thumbnails">
        {movies.map((movie: Movie, index: number) => {
          const isLastMovie = index === movies.length - 1;
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
                alt={
                  showPopularMovies
                    ? movie.title
                    : movie.name?.slice(0,-4)
                }
                className="thumbnail-image"
              />
              <div className="thumbnail-overlay">
                <img
                  src="img/popular-play.png"
                  alt="Play Button"
                  className="list-play-button"
                />
                <p className="movie-title">
                  {showPopularMovies ? movie.title : movie.name?.slice(0, -4)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieList;
