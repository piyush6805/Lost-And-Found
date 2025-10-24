import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // This will hold all items for the homepage
  currentItem: null, // This will hold the single item for the details page
  historyItems: [], // This will hold closed items for history page
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
    updateItemStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateItemSuccess: (state, action) => {
      state.loading = false;
      // Replace the item in the 'items' array
      state.items = state.items.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      // Also update the 'currentItem' if it's the one being viewed
      if (state.currentItem && state.currentItem._id === action.payload._id) {
        state.currentItem = action.payload;
      }
    },
    updateItemFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getHistoryStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getHistorySuccess: (state, action) => {
      state.loading = false;
      state.historyItems = action.payload;
    },
    getHistoryFail: (state, action) => {
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
  updateItemStart,
  updateItemSuccess,
  updateItemFail,
  getHistoryStart, 
  getHistorySuccess,
  getHistoryFail,
} = itemSlice.actions;

export default itemSlice.reducer;