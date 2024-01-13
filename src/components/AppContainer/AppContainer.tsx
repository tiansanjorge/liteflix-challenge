import { useState, useEffect } from "react";
import useActiveMovie from "../../helpers/useActiveMovie";
import "./AppContainer.scss";
import Header from "../Header/Header";
import ActiveMovie from "../ActiveMovie/ActiveMovie";
import MovieList from "../MovieList/MovieList";

const AppContainer: React.FC = () => {
  const { movies, loading, error } = useActiveMovie();
  const [selectedImagePath, setSelectedImagePath] = useState<string>("");

  useEffect(() => {
    const handleResize = () => {
      const selectedMovie = movies[18];

      if (selectedMovie) {
        const imageUrl =
          window.innerWidth >= 900
            ? `https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`
            : `https://image.tmdb.org/t/p/original${selectedMovie.poster_path}`;

        setSelectedImagePath(imageUrl);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [movies]);

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
    backgroundImage: `url(${selectedImagePath})`,
  };

  return (
    <div className="app-container">
      <div className="content-container">
        <Header />
        <div className="body">
          <ActiveMovie title={movies[18].title} />
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
