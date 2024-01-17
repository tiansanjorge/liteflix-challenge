// MobileHeader.tsx
import React, { useEffect, useState } from "react";
import "./MobileHeader.scss";
import AddMovie from "../AddMovie/AddMovie";
import Menu from "../Menu/Menu";
import ProfileComponent from "../ProfileComponent/ProfileComponent";

const MobileHeader: React.FC = () => {
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
    <header className='header'>
      <div className="header__section-logo">
        <div className="header__logo">
          LITE<span className="header__logo-part2">FLIX</span>
        </div>
        <button className="header__add-movie" onClick={handleAddMovieClick}>
          <img src="img/plus.png" alt="plus" className="header__header-plus-icon" />
          Agregar película
        </button>
      </div>
      <AddMovie show={showModal} onClose={handleCloseModal} />
      <img src="img/menu.png" alt="menu" className="header__menu-icon" onClick={handleMenuIconClick} />
        <ProfileComponent />
      {showMenu && <Menu onClose={() => setShowMenu(false)} />}
    </header>
  );
};

export default MobileHeader;
