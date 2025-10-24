import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../apiCalls/itemApi';
import axios from 'axios';

const CreatePostPage = () => {
  // --- Form State ---
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Other');
  const [postType, setPostType] = useState('lost');
  const [location, setLocation] = useState('');

  // --- Image State ---
  const [itemImage, setItemImage] = useState('');
  const [uploading, setUploading] = useState(false);
  // 1. ADD NEW ERROR STATE
  const [uploadError, setUploadError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { loading: itemLoading, error } = useSelector((state) => state.item);

  // --- 2. MODIFIED File Upload Handler ---
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    setUploadError(null); // Clear previous errors

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      // --- THIS IS THE MOST IMPORTANT CONSOLE LOG ---
      console.log('Server Upload Response:', data);

      if (data && data.url) {
        setItemImage(data.url); // Set the returned URL
        setUploading(false);
      } else {
        throw new Error('Server did not return a valid URL');
      }
    } catch (error) {
      console.error('Upload Error:', error);
      // Show error to the user
      setUploadError('Image upload failed. Please try a different image or try again later.');
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemData = {
      title,
      description,
      category,
      postType,
      location,
      itemImage: itemImage || undefined,
    };

    const success = await createItem(dispatch, itemData, token);

    if (success) {
      navigate('/');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Report a Lost or Found Item</h2>

        {/* --- All Existing Form Fields --- */}
        <div>
          <label>I...</label>
          <input
            type="radio"
            id="lost"
            name="postType"
            value="lost"
            checked={postType === 'lost'}
            onChange={(e) => setPostType(e.target.value)}
          />
          <label htmlFor="lost">Lost an Item</label>
          <input
            type="radio"
            id="found"
            name="postType"
            value="found"
            checked={postType === 'found'}
            onChange={(e) => setPostType(e.target.value)}
          />
          <label htmlFor="found">Found an Item</label>
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Electronics">Electronics</option>
            <option value="ID Card">ID Card</option>
            <option value="Keys">Keys</option>
            <option value="Apparel">Apparel</option>
            <option value="Books">Books</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Location (Optional):</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Library, Cafeteria"
          />
        </div>
        {/* --- End of Existing Fields --- */}

        {/* --- Image Upload Field --- */}
        <div>
          <label>Image (Optional):</label>
          <input
            type="file"
            id="image-file"
            label="Choose File"
            onChange={uploadFileHandler}
          />
          {uploading && <p>Uploading image...</p>}
          
          {/* 3. SHOW THE UPLOAD ERROR */}
          {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
        </div>

        {itemImage && (
          <div>
            <p>Image Uploaded:</p>
            <img
              src={itemImage}
              alt="Preview"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          </div>
        )}
        {/* --- End of Image Field --- */}

        <button type="submit" disabled={itemLoading || uploading}>
          {itemLoading ? 'Submitting...' : 'Submit Report'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default CreatePostPage;