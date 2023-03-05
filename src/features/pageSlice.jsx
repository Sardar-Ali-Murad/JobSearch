// This is the Store to add the common data for the app and the store Entry Point is in the store/Store.jsx and the whole store in wrapped in the parent of the whole app which is main.jsx

import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  paginationPage: 1,
  selectPage: 10,
  inputPage: 1,
  search: "",
  totalPages: 10,
  data: [],
  titleSort: false,
  descriptionSort: false,
  locationSort: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handlePaginationPage: (state, action) => {
      state.paginationPage = action.payload.page;
    },
    handleSelectPage: (state, action) => {
      state.selectPage = action.payload.page;
      state.paginationPage = 1;
    },
    handleInputPage: (state, action) => {
      state.inputPage = action.payload.page;
    },
    handleSearch: (state, action) => {
      state.search = action.payload.search;
    },
    handleTotalPages: (state, action) => {
      state.totalPages = action.payload.pages;
    },
    setData: (state, action) => {
      state.data = action.payload.data;
      state.totalPages=Math.ceil( action.payload.data.length / state.selectPage)
    },
    handleInputForm: (state) => {
      if (Number(state.inputPage) <= state.totalPages) {
        state.paginationPage = Number(state.inputPage);
      }
    },
    // handleTitleSort: (state) => {
    //   if (state.titleSort) {
    //     state.data = state.data.sort((a, b) => a.title - b.title);
    //   } else {
    //     state.data = state.data.sort((a, b) => b.title - a.title);
    //   }
    //   state.titleSort = !state.titleSort;
    // },

    handleTitleSort: (state) => {
      if (state.titleSort) {
        state.data = state.data.sort(function(a, b) {
          var textA = a.title.toUpperCase();
          var textB = b.title.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0});
      } else {
        state.data = state.data.sort(function(a, b) {
          var textA = a.title.toUpperCase();
          var textB = b.title.toUpperCase();
          return (textA < textB) ? 1 : (textA > textB) ? -1 : 0});
      }
      state.titleSort = !state.titleSort;
    },

    handleDescriptionSort: (state) => {
      if (state.descriptionSort) {
        state.data = state.data.sort(function(a, b) {
          var textA = a.description.toUpperCase();
          var textB = b.description.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0});
      } else {
        state.data = state.data.sort(function(a, b) {
          var textA = a.description.toUpperCase();
          var textB = b.description.toUpperCase();
          return (textA < textB) ? 1 : (textA > textB) ? -1 : 0});
      }
      state.descriptionSort = !state.descriptionSort;
    },


    handleLocationSort: (state) => {
      if (state.locationSort) {
        state.data = state.data.sort(function(a, b) {
          var textA = a.description.toUpperCase();
          var textB = b.description.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0});
      } else {
        state.data = state.data.sort(function(a, b) {
          var textA = a.location.toUpperCase();
          var textB = b.location.toUpperCase();
          return (textA < textB) ? 1 : (textA > textB) ? -1 : 0});
      }
      state.locationSort = !state.locationSort;
    },


    // handleDescriptionSort: (state) => {
    //   if (state.descriptionSort) {
    //     state.data = state.data.sort((a, b) => a.description > b.description);
    //   } else {
    //     state.data = state.data.sort((a, b) => a.description < b.description);
    //   }
    //   state.descriptionSort = !state.descriptionSort;
    // },


    // handleLocationSort: (state) => {
    //   if (state.locationSort) {
    //     state.data = state.data.sort((a, b) => a.location > b.location);
    //   } else {
    //     state.data = state.data.sort((a, b) => a.location < b.location);
    //   }
    //   state.locationSort = !state.locationSort;
    // },
  },
});

export const {
  handlePaginationPage,
  handleInputPage,
  handleSelectPage,
  handleSearch,
  handleTotalPages,
  setData,
  handleInputForm,
  handleDescriptionSort,
  handleLocationSort,
  handleTitleSort
} = userSlice.actions;

export default userSlice.reducer;
