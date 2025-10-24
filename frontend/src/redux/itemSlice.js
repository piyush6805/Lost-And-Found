import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // This will hold all items for the homepage
  currentItem: null, // This will hold the single item for the details page
  loading: false,
  error: null,
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    // --- Get All Items ---
    getItemsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getItemsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    getItemsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // --- Get Single Item By ID ---
    getItemStart: (state) => {
      state.loading = true;
      state.error = null;
      state.currentItem = null; // Clear previous item
    },
    getItemSuccess: (state, action) => {
      state.loading = false;
      state.currentItem = action.payload;
    },
    getItemFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // --- Create New Item ---
    createItemStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createItemSuccess: (state, action) => {
      state.loading = false;
      // Add the new item to the top of the list
      state.items = [action.payload, ...state.items];
    },
    createItemFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getItemsStart,
  getItemsSuccess,
  getItemsFail,
  getItemStart, 
  getItemSuccess, 
  getItemFail,
  createItemStart,
  createItemSuccess,
  createItemFail,
} = itemSlice.actions;

export default itemSlice.reducer;