import { useState, useEffect } from 'react';
import useActiveMovie from '../../helpers/useActiveMovie';
import './AppContainer.scss';
import Header from '../Header/Header';
import ActiveMovie from '../ActiveMovie/ActiveMovie';
import MovieList from '../MovieList/MovieList';

const AppContainer: React.FC = () => {
  const { movies, loading, error } = useActiveMovie();
  const [selectedImagePath, setSelectedImagePath] = useState<string>('');

  useEffect(() => {
    const handleResize = () => {
      const selectedMovie = movies[13];

      if (selectedMovie) {
        const imageUrl =
          window.innerWidth >= 480
            ? `https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`
            : `https://image.tmdb.org/t/p/original${selectedMovie.poster_path}`;

        setSelectedImagePath(imageUrl);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [movies]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || movies.length === 0) {
    return <p>There was an error loading the movie or no movies available.</p>;
  }

  const appContainerStyle = {
    backgroundImage: `url(${selectedImagePath})`,
  };

  return (
    <div className="AppContainer" style={appContainerStyle}>
      {/* <div className="gradient-overlay" /> */}
      <Header />
      <ActiveMovie title={movies[13].title} />
      <MovieList />
    </div>
  );
};

export default AppContainer;
