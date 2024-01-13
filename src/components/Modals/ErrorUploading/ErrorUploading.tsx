import React, {useState, useEffect} from "react";
import { Modal } from "react-bootstrap";
import MobileModalHeader from "../MobileModalHeader/MobileModalHeader";

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
        <div className="loading-container">
          <p><b>¡ERROR! </b> 
          {windowWidth < 900 ? "NO SE PUDO CARGAR LA PELÍCULA"  : "NO SE HA PODIDO CARGAR LA PELÍCULA"}
          </p>
          <progress className="progress-error" id="file" max="100" value="100">
            100%
          </progress>
          <p className="cancel" onClick={onRetry}>
            REINTENTAR
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
        {windowWidth < 900 && <button className="exit-button" onClick={onReset}>
            SALIR
          </button>}
      </Modal.Footer>
    </Modal>
  ) : null;
};

export default ErrorUploading;
