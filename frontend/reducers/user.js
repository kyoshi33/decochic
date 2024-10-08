import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    value: { isLogged: false, token: null, firstname: null, name: null, email: null, liked: [] },
  },
};

export const userSlice = createSlice({
  name: 'user',

  initialState,
  reducers: {
    login: (state, action) => {
      state.value.isLogged = true;
      state.value.token = action.payload.token;
      state.value.firstname = action.payload.firstname;
      state.value.name = action.payload.name;
      state.value.email = action.payload.email;
    },
    logout: (state) => {
      state.value.isLogged = false;
      state.value.token = null;
      state.value.firstname = null;
      state.value.name = null;
      state.value.email = null;
    },
    setLikedList: (state, action) => {
      state.value.liked = action.payload;
    },
  },
});

export const { login, logout, setLikedList } = userSlice.actions;
export default userSlice.reducer;