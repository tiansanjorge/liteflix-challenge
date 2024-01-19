import React, { useCallback, useState, useEffect } from "react";
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
      {currentModal === "AddingMovie" && (
        <>  
        <AddingMovie
          show={show}
          onReset={handleReset}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          handleFileChange={handleFileChange}
        />
        </>
      )}
      {currentModal === "UploadingMovie" && (
        <UploadingMovie
          fileUploaded={fileUploaded}
          movieData={movieData}
          onReset={handleReset}
        />
      )}
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
      )}
    </>
  );
};

export default AddMovie;
