import usePopularMovies from "../../helpers/usePopularMovies";
import "./MovieList.scss";

const MovieList = () => {
  const movies = usePopularMovies();

  interface Movie {
    id: number;
    title: string;
    release_date: string;
    vote_average: number;
    backdrop_path: string;
  }

  return (
    <div className="movie-list">
      <a href="#" className="popular-link">
        VER: <b>POPULARES</b>
        <img
          src="img/arrow.png"
          alt="Dropdown Menu"
          className="dropdown-arrow"
        />
      </a>
      <div className="movie-thumbnails">
        {movies.map((movie: Movie, index: number) => {
          const isLastMovie = index === movies.length - 1;
          // Si es la ultima de la lista se le modifica el margin-bottom
          const thumbnailClass = isLastMovie
            ? "last-movie-thumbnail"
            : "movie-thumbnail";

          return (
            <div key={index} className={thumbnailClass}>
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt={movie.title}
                className="thumbnail-image"
              />
              <div className="thumbnail-overlay">
                <img
                  src="img/popular-play.png"
                  alt="Play Button"
                  className="list-play-button"
                />
                <p className="movie-title">{movie.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieList;
