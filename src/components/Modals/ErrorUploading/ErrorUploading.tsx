import React from "react";
import { Modal } from "react-bootstrap";

interface ErrorUploadingProps {
  fileUploaded: boolean;
  movieData: { name: string; image: string } | null;
  onReset: () => void;
  onRetry: () => void;
}

const ErrorUploading: React.FC<ErrorUploadingProps> = ({
  fileUploaded,
  movieData,
  onReset,
  onRetry,
}) => {
  return movieData ? (
    <Modal show={fileUploaded} onHide={onReset} centered>
      <div className="modal-header">
        <img
          className="close-button"
          onClick={onReset}
          src="img/close.png"
          alt="close-button"
        />
        <Modal.Title className="modal-title">AGREGAR PELÍCULA</Modal.Title>
      </div>
      <Modal.Body>
        <div className="loading-container">
          <p>
            <b>¡ERROR!</b> NO SE HA PODIDO CARGAR LA PELÍCULA
          </p>
          <progress className="progress-error" id="file" max="100" value="100">
            40%
          </progress>
          <p className="cancel" onClick={onRetry}>
            REINTENTAR
          </p>
        </div>
        <div className="uploading-divider">
          <p>{movieData.name}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button disabled className="upload-button">
          Subir Película
        </button>
      </Modal.Footer>
    </Modal>
  ) : null;
};

export default ErrorUploading;
