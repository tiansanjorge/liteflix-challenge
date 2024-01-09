import { useState, useEffect } from 'react';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
}

const usePopularMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const apiKey = '6f26fd536dd6192ec8a57e94141f8b20';

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
        const data = response.data;
        const moviesData = data.results.slice(10, 14).map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          backdrop_path: movie.backdrop_path,
        }));
        setMovies(moviesData);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchPopularMovies();
  }, [apiKey]);

  return movies;
};

export default usePopularMovies;
