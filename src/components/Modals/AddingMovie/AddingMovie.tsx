import React from "react";
import { Modal } from "react-bootstrap";

interface AddingMovieProps {
  show: boolean;
  onClose: () => void;
  onFileUpload: () => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleFileChange: (file: File | undefined) => void;
}

const AddingMovie: React.FC<AddingMovieProps> = ({
  show,
  onClose,
  onFileUpload,
  onDrop,
  onDragOver,
  handleFileChange,
}) => {
  return (
    <Modal show={show} onHide={onClose} centered className="overflow-hidden">
      <div className="modal-header">
        <img
          className="close-button"
          onClick={onClose}
          src="img/close.png"
          alt="close-button"
        />
        <Modal.Title className="modal-title">AGREGAR PELÍCULA</Modal.Title>
      </div>
      <Modal.Body>
        <div className="container" onDrop={onDrop} onDragOver={onDragOver}>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(event) => {
              const file = event.target.files?.[0];
              handleFileChange(file);
            }}
            id="upload-input"
          />
          <label className="add-label" htmlFor="upload-input">
            <p>
              <img className="clip" src="img/clip.png" alt="clip" />
              AGREGÁ UN ARCHIVO O ARRASTRALO Y SOLTALO AQUÍ
            </p>
          </label>
        </div>
        <div className="divider">
          <p>TITULO</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="upload-button" onClick={onFileUpload}>
          SUBIR PELÍCULA
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddingMovie;
