import React from 'react';
import useMainMovie from '../../helpers/useMainMovie';
import './AppContainer.scss'; // Importa el archivo SCSS
import Header from "../Header/Header";
import ActiveMovie  from "../ActiveMovie/ActiveMovie";

const AppContainer: React.FC = () => {
  const { movies, loading, error } = useMainMovie();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || movies.length === 0) {
    return <p>There was an error loading the movie or no movies available.</p>;
  }

  const imageUrl = `https://image.tmdb.org/t/p/original${movies[15].backdrop_path}`;

  const appContainerStyle = {
    backgroundImage: `url(${imageUrl})`,
  };

  return (
    <div className='AppContainer' style={appContainerStyle}>
      <Header/>
      <ActiveMovie title={movies[15].title} />
    </div>
  );
};

export default AppContainer;
