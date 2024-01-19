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
  const [fileUploaded, setFileUploaded] = useState(false);
  const [currentModal, setCurrentModal] = useState<CurrentModal>(null);
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
        setFileUploaded(true);
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
    setFileUploaded(false);
    setMovieData(null);
    onClose();
  };

  const handleRetryUpload = () => {
    setCurrentModal("UploadFinished");
  };

  const handleUploadToMyMovies = () => {
    if (movieData) {
      const storedMovies = JSON.parse(localStorage.getItem("myMovies") || "[]");
      const updatedMovies = [...storedMovies, movieData];
      localStorage.setItem("myMovies", JSON.stringify(updatedMovies));
    }
    setCurrentModal("SuccessModal");
  };

  const handleGoToHome = () => {
    window.location.reload();
  };

  return (
    <>
      <Modal show={show} onHide={handleReset} centered className="add-movie">
        {windowWidth < 900 && <MobileMenuHeader onClose={handleReset} />}
        <div className="add-movie__content">
          <h3 className="add-movie__title">
            AGREGAR PELÍCULA
          </h3>

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
              <p className="add-movie__loading-cancel" onClick={handleReset}>
                CANCELAR
              </p>
            </div>
          )}
          <div className="add-movie__divider">
            <p className="add-movie__divider-title">TITULO</p>
          </div>
            <div className="add-movie__footer">
            <button className="add-movie__upload-button" disabled>
              SUBIR PELÍCULA
            </button>
            {windowWidth < 900 && (
              <button className="add-movie__exit-button" onClick={handleReset}>
                SALIR
              </button>
            )}
            </div>
        </div>
      </Modal>

      {/* 
      {currentModal === "ErrorUploading" && (
        <ErrorUploading
          fileUploaded={fileUploaded}
          movieData={movieData}
          onReset={handleReset}
          onRetry={handleRetryUpload}
        />
      )}
      {currentModal === "UploadFinished" && (
        <UploadFinished
          fileUploaded={fileUploaded}
          movieData={movieData}
          onReset={handleReset}
          onRetry={handleRetryUpload}
          onUpload={handleUploadToMyMovies}
        />
      )}
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
