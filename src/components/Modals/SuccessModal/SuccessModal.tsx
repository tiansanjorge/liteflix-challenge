import React from "react";
import { Modal } from "react-bootstrap";

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

  


  return movieData ? (
    <Modal show={fileUploaded} onHide={onReset} centered className="overflow-hidden">
      <div className="modal-header">
        <img
          className="close-button"
          onClick={onReset}
          src="img/close.png"
          alt="close-button"
        />
        <Modal.Title id="success-title">LITEFLIX</Modal.Title>
      </div>
      <Modal.Body>
        <div>
        <p className="congratulations">¡FELICITACIONES!</p>
        <p className="success-message">{movieData.name} FUE CORRECTAMENTE SUBIDA.</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button id="home-button" onClick={onGoToHome}>
          IR A HOME
        </button>
      </Modal.Footer>
    </Modal>
  ) : null;
};

export default SuccessModal;
