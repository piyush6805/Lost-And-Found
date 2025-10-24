import axios from 'axios';
import {
  authStart,
  authSuccess,
  authFail,
  getProfileStart,
  getProfileSuccess,
  getProfileFail,
  updateProfileSuccess, // <-- 1. IMPORT
} from '../redux/authSlice';

const API_URL = '/api/users';

/**
 * @param {function} dispatch - The Redux dispatch function
 * @param {object} userData - { name, email, password, contactNumber }
 */
export const registerUser = async (dispatch, userData) => {
  dispatch(authStart());
  try {
    const res = await axios.post(`${API_URL}/register`, userData);

    const { token, ...user } = res.data;
    dispatch(authSuccess({ user, token }));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(authFail(message));
  }
};

/**
 * @param {function} dispatch - The Redux dispatch function
 * @param {object} userData - { email, password }
 */
export const loginUser = async (dispatch, userData) => {
  dispatch(authStart());
  try {
    const res = await axios.post(`${API_URL}/login`, userData);

    const { token, ...user } = res.data;
    dispatch(authSuccess({ user, token }));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(authFail(message));
  }
};

/**
 * @param {function} dispatch - The Redux dispatch function
 * @param {string} token - The auth token
 */
export const getUserProfile = async (dispatch, token) => {
  dispatch(getProfileStart());
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(`${API_URL}/profile`, config);

    dispatch(getProfileSuccess(res.data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(getProfileFail(message));
  }
};

// --- 2. ADD THIS NEW FUNCTION ---
/**
 * @param {function} dispatch - The Redux dispatch function
 * @param {object} userData - { name, email, contactNumber, password }
 * @param {string} token - The auth token
 */
export const updateUserProfile = async (dispatch, userData, token) => {
  dispatch(authStart()); // Re-use authStart for loading
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.put(`${API_URL}/profile`, userData, config);

    // Split the response
    const { token: newToken, ...user } = res.data;
    dispatch(updateProfileSuccess({ user, token: newToken }));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(authFail(message));
  }
};