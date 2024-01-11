import React, { useRef, useState, useEffect } from "react";
import AddMovie from "../AddMovie/AddMovie";
import "./Menu.scss";

interface MenuProps {
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCloseClick = () => {
    onClose();
  };

  const handleAddMovieClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="background">
      <div className="menu-dropdown" ref={dropdownRef}>
        <div className="menu-header">
          <img
            className="close-button"
            onClick={handleCloseClick}
            src="img/close.png"
            alt="close-button"
          />
          <div className="section">
            <img
              src="img/notificacion.png"
              alt="notificacion"
              className="notification-icon"
            />
            <img src="img/perfil.png" alt="perfil" className="profile-icon" />
          </div>
        </div>
        <div className="content">
          <div className="options">
            <p>INICIO</p>
            <p>SERIES</p>
            <p>PELICULAS</p>
            <p>AGREGADAS RECIENTEMENTE</p>
            <p>POPULARES</p>
            <p>MIS PELICULAS</p>
            <p>MI LISTA</p>
          </div>
          <button className="menu-add-movie" onClick={handleAddMovieClick}>
            <img src="img/plus.png" alt="plus" className="menu-plus-icon" />
            Agregar película
          </button>
          
          <div className="log-out">
            CERRAR SESIÓN
          </div>
        </div>
      </div>
      <AddMovie show={showModal} onClose={handleCloseModal} />
    </div>
  );
};

export default Menu;

