import { useState, useEffect } from 'react';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  backdrop_path: string | null;
}

interface ActiveMovieHook {
  movies: Movie[];
  loading: boolean;
  error: any; 
}

const useActiveMovie = (): ActiveMovieHook => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchActiveMovie = async () => {
      try {
        const API_KEY = '6f26fd536dd6192ec8a57e94141f8b20';
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
        );

        const moviesData = response.data.results.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          backdrop_path: movie.backdrop_path,
        }));

        setMovies(moviesData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchActiveMovie();
  }, []);

  return { movies, loading, error };
};

export default useActiveMovie;

