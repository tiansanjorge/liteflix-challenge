import React, { useCallback, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import MobileMenuHeader from "../MobileMenuHeader/MobileMenuHeader";
import AddingMovie from "../Modals/AddingMovie/AddingMovie";
import UploadingMovie from "../Modals/UploadingMovie/UploadingMovie";
import ErrorUploading from "../Modals/ErrorUploading/ErrorUploading";
import UploadFinished from "../Modals/UploadFinished/UploadFinished";
import SuccessModal from "../Modals/SuccessModal/SuccessModal";

import "./AddMovie.scss";

interface AddMovieProps {
  show: boolean;
  onClose: () => void;
}

interface MovieData {
  name: string;
  image: string;
}

type CurrentModal =
  | "AddingMovie"
  | "UploadingMovie"
  | "ErrorUploading"
  | "UploadFinished"
  | "SuccessModal"
  | null;

const AddMovie: React.FC<AddMovieProps> = ({ show, onClose }) => {
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [currentModal, setCurrentModal] = useState<CurrentModal>(null);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
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

  useEffect(() => {
    if (show === true) {
      setCurrentModal("AddingMovie");
      console.log(show);
    }
  }, [show]);

  const handleFileChange = useCallback((file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        const fileData = {
          name: file.name,
          image: base64Image,
        };
        localStorage.setItem("movieData", JSON.stringify(fileData));
        setMovieData(fileData);
        setCurrentModal("UploadingMovie");
        console.log(currentModal);
        setTimeout(() => {
          setCurrentModal("ErrorUploading");
        }, 1500);
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
    setCurrentModal(null);
    setMovieData(null);
    onClose();
  };

  const handleRetry = () => {
    setCurrentModal("UploadFinished");
  };

  const handleUploadToMyMovies = () => {
    if (movieData) {
      const storedMovies = JSON.parse(localStorage.getItem("myMovies") || "[]");
      const updatedMovies = [...storedMovies, movieData];
      localStorage.setItem("myMovies", JSON.stringify(updatedMovies));
    }
    setOpenSuccessModal(true);}

  const handleGoToHome = () => {
    window.location.reload();
  };

  return (
    <>
      <Modal show={show} onHide={handleReset} centered className="add-movie">
        {windowWidth < 900 && <MobileMenuHeader onClose={handleReset} />}
        <div className="add-movie__content">
          <h3 className="add-movie__title">AGREGAR PELÍCULA</h3>

          {currentModal === "AddingMovie" && (
            <div
              className="add-movie__container"
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
              <label
                className="add-movie__container-label"
                htmlFor="upload-input"
              >
                <img
                  className="add-movie__container-clip"
                  src="img/clip.png"
                  alt="clip"
                />
                {windowWidth < 900
                  ? "AGREGA UN ARCHIVO"
                  : "AGREGÁ UN ARCHIVO O ARRASTRALO Y SOLTALO AQUÍ"}
              </label>
            </div>
          )}
          {currentModal === "UploadingMovie" && (
            <div className="add-movie__loading">
              <p className="add-movie__loading-label">
                CARGANDO <b>40%</b>
              </p>
              <progress
                className="add-movie__loading-progress"
                id="file"
                max="100"
                value="40"
              >
                40%
              </progress>
              <p className="add-movie__loading-option" onClick={handleReset}>
                CANCELAR
              </p>
            </div>
          )}
          {currentModal === "ErrorUploading" && (
            <div className="add-movie__loading">
              <p className="add-movie__loading-label">
                <b>¡ERROR! </b>{" "}
                {windowWidth < 900
                  ? "NO SE PUDO CARGAR LA PELÍCULA"
                  : "NO SE HA PODIDO CARGAR LA PELÍCULA"}
              </p>
              <progress
                className="add-movie__loading-progress-error"
                id="file"
                max="100"
                value="100"
              >
                100%
              </progress>
              <p className="add-movie__loading-option" onClick={handleRetry}>
                REINTENTAR
              </p>
            </div>
          )}
          {currentModal === "UploadFinished" && (
            <div className="add-movie__loading">
              <p className="add-movie__loading-label">
                <b>100% CARGADO</b>
              </p>
              <progress
                className="add-movie__loading-progress"
                id="file"
                max="100"
                value="100"
              >
                100%
              </progress>
              <p className="add-movie__loading-ready">¡LISTO!</p>
            </div>
          )}
          <div className="add-movie__divider">
            <p className="add-movie__divider-title">
              {movieData ? movieData.name.slice(0, -4) : "TITULO"}
            </p>
          </div>
          <div className="add-movie__footer">
            <button
              className="add-movie__upload-button" 
              onClick={currentModal === "UploadFinished" || currentModal === "AddingMovie" ? handleUploadToMyMovies : () => {}}
  disabled={currentModal !== "UploadFinished" && currentModal !== "AddingMovie"}
              
            >
              SUBIR PELÍCULA
            </button>
            {windowWidth < 900 && (
              <button className="add-movie__exit-button" onClick={handleReset}>
                SALIR
              </button>
            )}
          </div>
        </div>
        {openSuccessModal && (
        <Modal
          centered
          className="add-movie"
          onClose={() => {
            setOpenSuccessModal(false);
          }}
        >
          {windowWidth < 900 && <MobileMenuHeader onClose={handleReset} />}
          <div className="add-movie__success-content">
            <h3 className="add-movie__success-title">¡FELICITACIONES</h3>
            <p>{movieData?.name.slice(0, -4)} FUE CORRECTAMENTE SUBIDA</p>

            {windowWidth < 900 && (
              <button className="add-movie__success-exit-button" onClick={handleReset}>
                IR A HOME
              </button>
            )}
          </div>
        </Modal>
      )}
      </Modal>

      
      {/* 
      {currentModal === "SuccessModal" && (
        <SuccessModal
          fileUploaded={fileUploaded}
          movieData={movieData}
          onReset={handleReset}
          onGoToHome={handleGoToHome}
        />
      )} */}
    </>
  );
};

export default AddMovie;
