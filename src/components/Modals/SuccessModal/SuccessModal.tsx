import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import MobileModalHeader from "../MobileModalHeader/MobileModalHeader";

interface SuccessModalProps {
  fileUploaded: boolean;
  movieData: { name: string; image: string } | null;
  onReset: () => void;
  onGoToHome: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  fileUploaded,
  movieData,
  onReset,
  onGoToHome,
}) => {
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

  return movieData ? (
    <Modal
      show={fileUploaded}
      onHide={onReset}
      centered
      className="overflow-hidden"
    >
      {windowWidth < 480 && <MobileModalHeader onReset={onReset} />}
      <div className="modal-header">
        {windowWidth > 480 && (
          <img
            className="close-button"
            onClick={onReset}
            src="img/close.png"
            alt="close-button"
          />
        )}

        {windowWidth > 480 && (
          <Modal.Title id="success-title">LITEFLIX</Modal.Title>
        )}
      </div>
      <div className="body-modal">
        <div>
          <p className="congratulations">¡FELICITACIONES!</p>
          <p className="success-message">
            {movieData.name.slice(0,-4)} FUE CORRECTAMENTE SUBIDA.
          </p>
        </div>
      </div>
      <Modal.Footer>
        <button id="home-button" onClick={onGoToHome}>
          IR A HOME
        </button>
      </Modal.Footer>
    </Modal>
  ) : null;
};

export default SuccessModal;
