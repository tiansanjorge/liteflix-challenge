import { useState, useEffect } from "react";
import useActiveMovie from "../../helpers/useActiveMovie";
import "./AppContainer.scss";
import DesktopHeader from "../DesktopHeader/DesktopHeader";
import MobileHeader from "../MobileHeader/MobileHeader";
import ActiveMovie from "../ActiveMovie/ActiveMovie";
import MovieList from "../MovieList/MovieList";

const AppContainer: React.FC = () => {
  const { movies, loading, error } = useActiveMovie();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading) {
    return (
      <p className="app-container__loading-message">
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
    backgroundImage: `url(https://image.tmdb.org/t/p/original${movies[5].backdrop_path})`,
  };

  return (
    <div className="app-container">
      <div className="app-container__content">
        {windowWidth < 900 ? <MobileHeader/> : <DesktopHeader />}
        <div className="app-container__body">
          <ActiveMovie title={movies[4].title} />
          <MovieList />
        </div>
      </div>
      <div className="app-container__background" style={movieBackground}>
        <div className="app-container__gradient-overlay" />
      </div>
    </div>
  );
};

export default AppContainer;
