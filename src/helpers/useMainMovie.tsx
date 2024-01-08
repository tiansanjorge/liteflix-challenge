import { useState, useEffect } from 'react';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  backdrop_path: string | null;
}

interface MainMovieHook {
  movies: Movie[];
  loading: boolean;
  error: any; 
}

const useMainMovie = (): MainMovieHook => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchMainMovie = async () => {
      try {
        const API_KEY = '6f26fd536dd6192ec8a57e94141f8b20';
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
        );
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchMainMovie();
  }, []);

  return { movies, loading, error };
};

export default useMainMovie;
