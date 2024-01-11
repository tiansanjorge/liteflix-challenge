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
      const selectedMovie = movies[15];

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

  const movieBackground = {
    backgroundImage: `url(${selectedImagePath})`,
  };

  return (
    <div className="app-container">
      <div className="content-container">
        <Header />
        <ActiveMovie title={movies[15].title} />
        <MovieList />
      </div>
      <div className="background-image" style={{ backgroundImage: `url(${selectedImagePath})` }}>
      <div className="gradient-overlay" />
      </div>
    </div>
    
  );
};

export default AppContainer;
