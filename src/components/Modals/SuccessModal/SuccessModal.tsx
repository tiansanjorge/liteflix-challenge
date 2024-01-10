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
      <Modal.Header closeButton>
        <Modal.Title>AGREGAR PELICULA</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>EXITO!</label>
        <progress id="file" max="100" value="100">
          70%
        </progress>
        <div className="divider">{movieData.name}</div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onRetry}>Reintentar</button>
        <button disabled>Subir Película</button>
      </Modal.Footer>
    </Modal>
  ) : null;
};

export default ErrorUploading;
