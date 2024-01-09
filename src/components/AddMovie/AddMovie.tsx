import React, { useCallback, useState } from "react";
import { Modal,Button, ProgressBar } from "react-bootstrap";
import "./AddMovie.scss";

interface AddMovieProps {
  show: boolean;
  onClose: () => void;
}

const AddMovie: React.FC<AddMovieProps> = ({ show, onClose }) => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [movieData, setMovieData] = useState<{ name: string; image: string } | null>(null);

  const handleFileChange = useCallback((file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        const fileData = {
          name: file.name,
          image: base64Image,
        };
        localStorage.setItem("movieData", JSON.stringify(fileData))
        setMovieData(fileData);
        setFileUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const file = event.dataTransfer.files?.[0];
      handleFileChange(file);
    },
    [handleFileChange]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    []
  );

  const handleReset = () => {
    localStorage.removeItem("movieData");
    setFileUploaded(false);
    setMovieData(null);
  };

  const secondModal = movieData ? (
    <Modal show={fileUploaded} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Archivo Cargado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>{`Archivo: ${movieData.name}`}</label>
        <progress id="file" max="100" value="70">
          70%
        </progress>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleReset}>Cancelar</button>
        <button disabled>Subir Película</button>
      </Modal.Footer>
    </Modal>
  ) : null;

  const handleFileUpload = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFileChange(file);
      }
    };
    input.click();
  }, [handleFileChange]);

  return (
    <>
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
        <div
            className="container"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
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
          <button className="upload-button" onClick={handleFileUpload}>
            SUBIR PELÍCULA
          </button>
        </Modal.Footer>
      </Modal>
      {secondModal}
    </>
  );
};

export default AddMovie;
