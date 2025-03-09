import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import '../App.css'; // Import external CSS

function PostAuction() {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [startingBid, setStartingBid] = useState(0);
  const [closingTime, setClosingTime] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });

  const handlePostAuction = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    if (!token) {
      alert('You must be signed in to post an auction.');
      navigate('/signin');
      return;
    }

    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('description', description);
    formData.append('startingBid', startingBid);
    formData.append('closingTime', closingTime);
    if (image) formData.append('image', image);

    try {
      await axios.post('http://localhost:5001/auction', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Auction item posted!');
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to post auction. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2 className="heading">Post New Auction</h2>
      <form onSubmit={handlePostAuction} className="form">
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
          className="input"
        />
        <textarea
          placeholder="Item Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="textarea"
        ></textarea>
        <input
          type="number"
          placeholder="Starting Bid"
          value={startingBid}
          onChange={(e) => setStartingBid(e.target.value)}
          required
          className="input"
        />
        <input
          type="datetime-local"
          value={closingTime}
          onChange={(e) => setClosingTime(e.target.value)}
          required
          className="input"
        />

        {/* Image Upload Section */}
        <div {...getRootProps()} className="image-upload-box">
          <input {...getInputProps()} />
          {preview ? (
            <img src={preview} alt="Preview" className="image-preview" />
          ) : (
            <p className="upload-text">Drag & drop an image here, or click to select one</p>
          )}
        </div>

        <button type="submit" className="button">Post Auction</button>
      </form>
    </div>
  );
}

export default PostAuction;
