import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Records.css';

const Records = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState({});

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/me/records', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setRecords(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching records:", err);
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  const handleImageLoad = (recordId) => {
    setImageLoading((prevState) => ({ ...prevState, [recordId]: true }));
  };

  const downloadPDF = async (recordId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/predictions/pdf/${recordId}`, {
        responseType: 'blob',
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `record-${recordId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Error downloading PDF:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="records-container">
      <h2>Prediction Records</h2>
      {records.map(record => (
        <div key={record._id} className="record-item">
          <h3>{new Date(record.date).toLocaleDateString()}</h3>
          {!imageLoading[record._id] && <div className="image-placeholder">Loading image...</div>}
          <img
            src={`http://localhost:5000${record.imagePath}`}
            alt="Record"
            style={{ display: imageLoading[record._id] ? 'block' : 'none' }}
            onLoad={() => handleImageLoad(record._id)}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'default-image-path'; // Replace with actual default image path
            }}
          />
          <p><strong>Prediction:</strong> {record.prediction}</p>
          <button className="btn" onClick={() => downloadPDF(record._id)}>Download PDF</button>
        </div>
      ))}
    </div>
  );
};

export default Records;
