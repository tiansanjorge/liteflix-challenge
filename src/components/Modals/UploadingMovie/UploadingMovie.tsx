import React from "react";
import { Modal } from "react-bootstrap";

interface UploadingMovieProps {
  fileUploaded: boolean;
  movieData: { name: string; image: string } | null;
  onReset: () => void;
}

const UploadingMovie: React.FC<UploadingMovieProps> = ({
  fileUploaded,
  movieData,
  onReset,
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
            CARGANDO <b>40%</b>
          </p>
          <progress className="progress-uploading" id="file" max="100" value="40">
            40%
          </progress>
          <p className="cancel" onClick={onReset}>
            CANCELAR
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

export default UploadingMovie;
