import axios from 'axios';
import { authStart, authSuccess, authFail } from '../redux/authSlice';

const API_URL = '/api/users'; // We use the proxy

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