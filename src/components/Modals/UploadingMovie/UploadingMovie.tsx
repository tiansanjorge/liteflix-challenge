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
      <Modal.Header closeButton>
        <Modal.Title>AGREGAR PELICULA</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>CARGANDO 70%</label>
        <progress id="file" max="100" value="70">
          70%
        </progress>
        <div className="divider">{movieData.name}</div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onReset}>Cancelar</button>
        <button disabled>Subir Película</button>
      </Modal.Footer>
    </Modal>
  ) : null;
};

export default UploadingMovie;
