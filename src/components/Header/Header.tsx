import React from "react";
import "./Header.scss";

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="section">
        <div className="logo">
          LITE<span className="logo2">FLIX</span>
        </div>

        <a href="#" className="add-movie">
          <img src="img/plus.png" alt="plus" className="plus-icon" />
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
    </div>
  );
};

export default Header;
