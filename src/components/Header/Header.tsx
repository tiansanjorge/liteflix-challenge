import React, { useEffect, useState } from "react";
import "./Header.scss";
import AddMovie from "../AddMovie/AddMovie";

const Header: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleAddMovieClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {windowWidth < 480 ? (
        <div className="header">
          <img src="img/menu-mobile.png" alt="menu" className="menu-icon" />
          <div className="logo">
            LITE<span className="logo2">FLIX</span>
          </div>
          <img src="img/perfil.png" alt="perfil" className="profile-icon" />
        </div>
      ) : (
        <div className="header">
          <div className="section">
            <div className="logo">
              LITE<span className="logo2">FLIX</span>
            </div>

            <a href="#" className="add-movie" onClick={handleAddMovieClick}>
              <img src="img/plus.png" alt="plus" className="header-plus-icon" />
              Agregar película
            </a>
          </div>

          <div className="section">
            <img src="img/menu.png" alt="menu" className="menu-icon" />
            <img
              src="img/notificacion.png"
              alt="notificacion"
              className="notification-icon"
            />
            <img src="img/perfil.png" alt="perfil" className="profile-icon" />
          </div>

          <AddMovie show={showModal} onClose={handleCloseModal} />
        </div>
      )}
    </>
  );
};

export default Header;
