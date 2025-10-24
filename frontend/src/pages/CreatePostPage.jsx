import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../apiCalls/itemApi';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Other');
  const [postType, setPostType] = useState('lost'); // 'lost' or 'found'
  const [location, setLocation] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.item);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemData = { title, description, category, postType, location };

    const success = await createItem(dispatch, itemData, token);

    if (success) {
      navigate('/'); // Redirect to home on success
    }
  };

  return (
    <div>
      <h2>Report a Lost or Found Item</h2>
      <form onSubmit={handleSubmit}>
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
            onChange={(e) => setCategory(e.targe.value)}
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
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Report'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default CreatePostPage;