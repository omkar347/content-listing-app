import { createSlice } from '@reduxjs/toolkit';
import { enumApiKeys, filterDataByQuery } from '../../common/config';
import { apiFetchMovies } from './moviesAPI';

const initialState = {
  sQuery: '',
  jTotalRecords: 0,
  data: {},
  isDataLoading: false,
  isDataError: false,
  isDataSuccess: false,
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    pending: (state) => {
      state.isDataLoading = true;
      state.isDataError = false;
      state.isDataSuccess = false;
    },
    error: (state) => {
      state.isDataLoading = false;
      state.isDataError = true;
      state.isDataSuccess = false;
      state.data[enumApiKeys.isDone] = true;
    },
    success: (state, action) => {
      const { page } = action.payload || {};
      const { [enumApiKeys.contentItems]: contentItems, ...restEle } = page || {};
      const totalContentItems = restEle[enumApiKeys.totalContentItems];
      const arrCurrentData = state.data && state.data[enumApiKeys.allPagesData];
      const arrNewDate = (contentItems && contentItems[enumApiKeys.content]) || [];
      const arrAllMergedData = (arrCurrentData || []).concat(arrNewDate);
      let arrSearchedData = filterDataByQuery(arrAllMergedData, state.sQuery);
      const isDone = arrAllMergedData.length >= totalContentItems;

      state.isDataLoading = false;
      state.isDataError = false;
      state.isDataSuccess = true;
      state.data = {
        ...restEle,
        [enumApiKeys.allPagesData]: arrAllMergedData,
        [enumApiKeys.isDone]: isDone,
        [enumApiKeys.searchedData]: arrSearchedData,
      };
    },
    searchForData: (state, action) => {
      let arrSearchedData = filterDataByQuery(state.data[enumApiKeys.allPagesData], action.payload);
      state.sQuery = action.payload;
      state.data[enumApiKeys.searchedData] = arrSearchedData;
    }
  },
});

export const { actions, reducer } = moviesSlice;
export const { pending, error, success, searchForData } = actions;

export const selectMovies = (state) => state.movies.data;
export const selectPending = (state) => state.movies.isDataLoading;
export const selectQuery = (state) => state.movies.sQuery;

export const actionCreatorCallMovies = (jPageNo) => async (dispatch, getState) => {
  try {
    dispatch(pending());
    const resp = await apiFetchMovies(jPageNo);
    dispatch(success(resp.data));
  }
  catch (e) {
    dispatch(error());
  }
};

export default reducer;
