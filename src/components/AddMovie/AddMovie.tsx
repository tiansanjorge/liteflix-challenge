// import React, { useCallback, useState } from "react";
// import AddingMovie from "../Modals/AddingMovie/AddingMovie";
// import UploadingMovie from "../Modals/UploadingMovie/UploadingMovie";
// import "./AddMovie.scss";

// interface AddMovieProps {
//   show: boolean;
//   onClose: () => void;
// }

// const AddMovie: React.FC<AddMovieProps> = ({ show, onClose }) => {
//   const [fileUploaded, setFileUploaded] = useState(false);
//   const [movieData, setMovieData] = useState<{ name: string; image: string } | null>(null);

//   const handleFileChange = useCallback((file: File | undefined) => {
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const base64Image = reader.result as string;
//         const fileData = {
//           name: file.name,
//           image: base64Image,
//         };
//         localStorage.setItem("movieData", JSON.stringify(fileData))
//         setMovieData(fileData);
//         setFileUploaded(true);
//       };
//       reader.readAsDataURL(file);
//     }
//   }, []);

//   const handleDrop = useCallback(
//     (event: React.DragEvent<HTMLDivElement>) => {
//       event.preventDefault();
//       const file = event.dataTransfer.files?.[0];
//       handleFileChange(file);
//     },
//     [handleFileChange]
//   );

//   const handleDragOver = useCallback(
//     (event: React.DragEvent<HTMLDivElement>) => {
//       event.preventDefault();
//     },
//     []
//   );

//   const handleReset = () => {
//     localStorage.removeItem("movieData");
//     setFileUploaded(false);
//     setMovieData(null);
//   };

//   const handleFileUpload = useCallback(() => {
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "image/*";
//     input.onchange = (event) => {
//       const file = (event.target as HTMLInputElement).files?.[0];
//       if (file) {
//         handleFileChange(file);
//       }
//     };
//     input.click();
//   }, [handleFileChange]);

//   return (
//     <>
//       <AddingMovie
//         show={show}
//         onClose={onClose}
//         onFileUpload={handleFileUpload}
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         handleFileChange={handleFileChange}
//       />
      
//       <UploadingMovie
//         fileUploaded={fileUploaded}
//         movieData={movieData}
//         onReset={handleReset}
//       />
//     </>
//   );
// };

// export default AddMovie;


import React, { useCallback, useState } from "react";
import AddingMovie from "../Modals/AddingMovie/AddingMovie";
import UploadingMovie from "../Modals/UploadingMovie/UploadingMovie";
import ErrorUploading from "../Modals/ErrorUploading/ErrorUploading"; 
import UploadEnd from "../Modals/UploadEnd/UploadEnd"; 
import SuccessModal from "../Modals/SuccessModal/SuccessModal"; 

import "./AddMovie.scss";

interface AddMovieProps {
  show: boolean;
  onClose: () => void;
}

const AddMovie: React.FC<AddMovieProps> = ({ show, onClose }) => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [movieData, setMovieData] = useState<{ name: string; image: string } | null>(null);
  const [showErrorUploading, setShowErrorUploading] = useState(false);
  const [showUploadEnd, setShowUploadEnd] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
        setTimeout(() => {
          setShowErrorUploading(true);
        }, 1500); // Mostrar el modal de éxito después de 1.5 segundos
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
    setShowErrorUploading(false);
    setShowUploadEnd(false)
    setShowSuccessModal(false)
  };

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

  


const handleRetryUpload = () => {
  setShowUploadEnd(true);
  setTimeout(() => {
    setShowSuccessModal(true);
  }, 1000)
};

  return (
    <>
      <AddingMovie
        show={show}
        onClose={onClose}
        onFileUpload={handleFileUpload}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        handleFileChange={handleFileChange}
      />
      
      <UploadingMovie
        fileUploaded={fileUploaded}
        movieData={movieData}
        onReset={handleReset}
      />

{showErrorUploading && (
        <ErrorUploading
        fileUploaded={fileUploaded}
        movieData={movieData}
        onReset={handleReset}
        onRetry={handleRetryUpload} 
        />
      )}

{showUploadEnd && (
      <UploadEnd
        fileUploaded={fileUploaded}
        movieData={movieData}
        onReset={handleReset}
        onRetry={handleRetryUpload}
      />
    )}

{showSuccessModal && (
      <SuccessModal
        fileUploaded={fileUploaded}
        movieData={movieData}
        onReset={handleReset}
        onRetry={handleRetryUpload}
      />
    )}
    </>
  );
};

export default AddMovie;
