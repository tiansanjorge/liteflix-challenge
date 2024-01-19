import "./MobileMenuHeader.scss";

interface MobileMenuHeaderProps {
  onClose: () => void;
}

const MobileMenuHeader: React.FC<MobileMenuHeaderProps> = ({ onClose }) => {
  return (
    <header className="mobile-menu-header">
      <img
        className="mobile-menu-header__close-button"
        onClick={onClose}
        src="img/close.png"
        alt="close-button"
      />

      <div className="mobile-menu-header__logo">
        LITE<span className="mobile-menu-header__logo-part2">FLIX</span>
      </div>
      <img
        src="img/perfil.png"
        alt="perfil"
        className="mobile-header__profile-icon"
      />
    </header>
  );
};

export default MobileMenuHeader;
