import React from "react";

import "./MobileModalHeader.scss";


interface MobileModalHeaderProps {
  onReset: () => void;
}

const MobileModalHeader: React.FC<MobileModalHeaderProps> = ({onReset}) => {

  return (
    <>
      
        <div className="mobile-modal-header">
          <img
            src="img/menu-mobile.png"
            alt="menu"
            className="menu-icon cursor-pointer"
            onClick={onReset}
          />
          <div className="logo">
            LITE<span className="logo2">FLIX</span>
          </div>
          <img src="img/perfil.png" alt="perfil" className="profile-icon" />
        </div>
    </>
  );
};

export default MobileModalHeader;
