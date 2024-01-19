// MobileHeader.tsx
import React, { useState } from "react";
import "./MobileHeader.scss";
import Menu from "../Menu/Menu";

const MobileHeader: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuIconClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="mobile-header">

      <img
        src="img/menu-mobile.png"
        alt="menu"
        className="mobile-header__menu-icon"
        onClick={handleMenuIconClick}
      />

      <div className="mobile-header__logo">
        LITE<span className="mobile-header__logo-part2">FLIX</span>
      </div>
      <img
        src="img/perfil.png"
        alt="perfil"
        className="mobile-header__profile-icon"
      />

      {showMenu && <Menu onClose={() => setShowMenu(false)} />}
    </header>
  );
};

export default MobileHeader;
