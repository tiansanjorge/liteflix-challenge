// DesktopHeader.tsx
import React, { useState } from "react";
import "./DesktopHeader.scss";
import AddMovie from "../AddMovie/AddMovie";
import Menu from "../Menu/Menu";
import ProfileComponent from "../ProfileComponent/ProfileComponent";

const DesktopHeader: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuIconClick = () => {
    setShowMenu(!showMenu);
  };

  const handleAddMovieClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <header className='desktop-header'>
      <div className="desktop-header__section-logo">
        <h2 className="desktop-header__logo">
          LITE<span className="desktop-header__logo-part2">FLIX</span>
        </h2>
        <button className="desktop-header__add-movie" onClick={handleAddMovieClick}>
          <img src="img/plus.png" alt="plus" className="desktop-header__header-plus-icon" />
          Agregar película
        </button>
      </div>
      <AddMovie show={showModal} onClose={handleCloseModal} />
      <img src="img/menu.png" alt="menu" className="desktop-header__menu-icon" onClick={handleMenuIconClick} />
        <ProfileComponent />
      {showMenu && <Menu onClose={() => setShowMenu(false)} />}
    </header>
  );
};

export default DesktopHeader;
