import React, {useState, useEffect} from "react";
import { Modal } from "react-bootstrap";
import MobileModalHeader from "../MobileModalHeader/MobileModalHeader";

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
    <Modal show={fileUploaded} onHide={onReset} centered>
      {windowWidth < 480 && <MobileModalHeader onReset={onReset} />}
      <div className="modal-header">
      {windowWidth > 480 && <img
            className="close-button"
            onClick={onReset}
            src="img/close.png"
            alt="close-button"
          />}
        <Modal.Title className="modal-title">AGREGAR PELÍCULA</Modal.Title>
      </div>
      <div className="body-modal">
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
          <p>{movieData.name.slice(0,-4)}</p>
        </div>
      </div>
      <Modal.Footer>
        <button disabled className="upload-button">
          Subir Película
        </button>
        {windowWidth < 480 && <button className="exit-button" onClick={onReset}>
            SALIR
          </button>}
      </Modal.Footer>
    </Modal>
  ) : null;
};

export default UploadingMovie;
