import axios from 'axios';
import {
  authStart,
  authSuccess,
  authFail,
  getProfileStart,
  getProfileSuccess,
  getProfileFail,
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

    // Backend returns { _id, name, email, ..., token }
    // We split it for our Redux state
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

    // Backend returns { _id, name, email, ..., token }
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
    // We must send the token in the headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(`${API_URL}/profile`, config);

    // The backend just returns the user object
    dispatch(getProfileSuccess(res.data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // If the token is bad, this will log the user out
    dispatch(getProfileFail(message));
  }
};