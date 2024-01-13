import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import MobileModalHeader from "../MobileModalHeader/MobileModalHeader";

interface AddingMovieProps {
  show: boolean;
  onReset: () => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleFileChange: (file: File | undefined) => void;
}

const AddingMovie: React.FC<AddingMovieProps> = ({
  show,
  onReset,
  onDrop,
  onDragOver,
  handleFileChange,
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

  return (
    <>
      <Modal show={show} onHide={onReset} centered className="overflow-hidden">
        {windowWidth < 900 && <MobileModalHeader onReset={onReset} />}

        <div className="modal-header">
        {windowWidth > 900 && <img
            className="close-button"
            onClick={onReset}
            src="img/close.png"
            alt="close-button"
          />}
          
          <Modal.Title className="modal-title">AGREGAR PELÍCULA</Modal.Title>
        </div>
        <div className="body-modal">
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
                {windowWidth < 900 ? "AGREGA UN ARCHIVO" : "AGREGÁ UN ARCHIVO O ARRASTRALO Y SOLTALO AQUÍ"}
                
              </p>
            </label>
          </div>
          <div className="divider">
            <p>TITULO</p>
          </div>
        </div>
        <Modal.Footer>
          <button className="upload-button" disabled>
            SUBIR PELÍCULA
          </button>
          {windowWidth < 900 && <button className="exit-button" onClick={onReset}>
            SALIR
          </button>}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddingMovie;
