import axios from 'axios';
import {
  getItemsStart,
  getItemsSuccess,
  getItemsFail,
  getItemStart, // <-- ADD
  getItemSuccess, // <-- ADD
  getItemFail, // <-- ADD
  createItemStart,
  createItemSuccess,
  createItemFail,
} from '../redux/itemSlice';

const API_URL = '/api/items';

// Get all open items
export const getAllItems = async (dispatch) => {
  dispatch(getItemsStart());
  try {
    const res = await axios.get(API_URL);
    dispatch(getItemsSuccess(res.data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(getItemsFail(message));
  }
};

// --- ADD THIS NEW FUNCTION ---
// Get single item by ID
export const getItemById = async (dispatch, id) => {
  dispatch(getItemStart());
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    dispatch(getItemSuccess(res.data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(getItemFail(message));
  }
};
// --- END OF NEW FUNCTION ---

// Create a new item
export const createItem = async (dispatch, itemData, token) => {
  dispatch(createItemStart());
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Token is required
      },
    };

    const res = await axios.post(API_URL, itemData, config);
    dispatch(createItemSuccess(res.data));
    return true; // Return success
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(createItemFail(message));
    return false; // Return failure
  }
};