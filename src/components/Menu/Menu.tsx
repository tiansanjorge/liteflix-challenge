import React, { useRef, useState, useEffect } from "react";
import AddMovie from "../AddMovie/AddMovie";
import "./Menu.scss";
import MobileMenuHeader from "../MobileMenuHeader/MobileMenuHeader";
import ProfileComponent from "../ProfileComponent/ProfileComponent";

interface MenuProps {
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
    <div className="menu">
      <div className="menu__dropdown" ref={dropdownRef}>
        {windowWidth > 900 ? (
          <div className="menu__header">
            <img
              className="menu__close-button"
              onClick={handleCloseClick}
              src="img/close.png"
              alt="close-button"
            />

            <ProfileComponent />
          </div>
        ):
        <MobileMenuHeader onClose={handleCloseClick}/> 
        }

        <div className="menu__content">
          <div className="menu__options">
            <p>INICIO</p>
            <p>SERIES</p>
            <p>PELICULAS</p>
            <p>AGREGADAS RECIENTEMENTE</p>
            <p>POPULARES</p>
            <p>MIS PELICULAS</p>
            <p>MI LISTA</p>
          </div>
          <button className="menu__add-movie" onClick={handleAddMovieClick}>
            <img src="img/plus.png" alt="plus" className="menu__plus-icon" />
            Agregar película
          </button>

          <div className="menu__log-out">CERRAR SESIÓN</div>
        </div>
      </div>
      <AddMovie show={showModal} onClose={handleCloseModal} />
    </div>
  );
};

export default Menu;
