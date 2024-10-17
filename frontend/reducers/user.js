import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    value: { isLogged: false, token: null, civilite: null, firstName: null, name: null, email: null, items: [], liked: [] },
  },
};

export const userSlice = createSlice({
  name: 'user',

  initialState,
  reducers: {
    login: (state, action) => {
      state.value.isLogged = true;
      state.value.token = action.payload.token;
      state.value.civilite = action.payload.civilite;
      state.value.firstName = action.payload.firstName;
      state.value.name = action.payload.name;
      state.value.email = action.payload.email;
    },
    logout: (state) => {
      state.value.isLogged = false;
      state.value.token = null;
      state.value.civilite = null;
      state.value.firstName = null;
      state.value.name = null;
      state.value.email = null;
    },
    setLikedList: (state, action) => {
      state.value.liked = action.payload;
    },
    addToCart: (state, action) => {
      state.value.items.push = action.payload;
      console.log(addToCart);
    },

    removeCart: (state, action) => {
      state.value.items.filter(item => item._id !== action.payload._id);
    },

  },
});

export const { login, logout, setLikedList, addToCart, removeCart } = userSlice.actions;
export default userSlice.reducer;