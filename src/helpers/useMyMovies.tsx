import { useState, useEffect } from 'react';

const useMyMovies = () => {
  const [movies, setMovies] = useState<any[]>([]);
  useEffect(() => {
    const getMoviesFromLocalStorage = () => {
      const myMovies = localStorage.getItem('myMovies');
      if (myMovies) {
        try {
          const parsedMovies = JSON.parse(myMovies);
          const firstFourMovies = parsedMovies.slice(0, 6);
          setMovies(firstFourMovies);
        } catch (error) {
          console.error('Error al parsear las películas:', error);
        }
      }
    };

    getMoviesFromLocalStorage();
  }, []);
  
  return movies;
};

export default useMyMovies;
