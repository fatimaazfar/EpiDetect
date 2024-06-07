import React, { useState, useRef } from 'react';
import axios from 'axios';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Webcam from 'react-webcam';
import './Predict.css';

const Predict = () => {
  const [file, setFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedImageURL, setCroppedImageURL] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [cropper, setCropper] = useState(null);
  const [useCamera, setUseCamera] = useState(false);
  const [error, setError] = useState(null);
  const webcamRef = useRef(null);

  const onFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setFile(imageSrc);
  };

  const getCropData = () => {
    if (!cropper) {
      alert("Please select and crop an image first.");
      return;
    }
    cropper.getCroppedCanvas().toBlob((blob) => {
      const croppedFile = new File([blob], "croppedImage.jpg", {
        type: "image/jpeg",
      });
      setCroppedImage(croppedFile);
      setCroppedImageURL(URL.createObjectURL(croppedFile));
    }, "image/jpeg");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!croppedImage) {
      alert("Please crop the image first!");
      return;
    }

    const formData = new FormData();
    formData.append('image', croppedImage);

    try {
      const res = await axios.post('http://localhost:5000/api/predictions', formData, {
        headers: { 'Content-Type': 'multipart/form-data', 'x-auth-token': localStorage.getItem('token') }
      });
      setPrediction(res.data.prediction);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to get prediction. Please try again.');
    }
  };

  return (
    <div className="predict-container">
      <h2>Predict Skin Disease</h2>
      <form onSubmit={onSubmit} className="predict-form">
        <input type="file" accept="image/*" onChange={onFileChange} />
        <button type="button" onClick={() => setUseCamera(!useCamera)} className="btn">
          {useCamera ? "Stop Camera" : "Use Camera"}
        </button>
        {useCamera && (
          <div className="webcam-container">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
            <button type="button" onClick={capture} className="btn">Capture Photo</button>
          </div>
        )}
        {file && (
          <Cropper
            style={{ height: 400, width: "100%" }}
            aspectRatio={1}
            src={file}
            viewMode={1}
            guides={false}
            scalable={true}
            cropBoxResizable={true}
            onInitialized={(instance) => setCropper(instance)}
          />
        )}
        <button type="button" onClick={getCropData} className="btn">Crop Image</button>
        <button type="submit" className="btn">Predict</button>
      </form>
      {croppedImageURL && (
        <div className="cropped-image-container">
          <h3>Cropped Image</h3>
          <img src={croppedImageURL} alt="Cropped" />
        </div>
      )}
      {prediction && (
        <div className="prediction-result" style={{ fontSize: '1.5em', marginTop: '20px' }}>
          Prediction: <strong>{prediction}</strong>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Predict;
