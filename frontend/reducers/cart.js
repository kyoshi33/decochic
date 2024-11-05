import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
};


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    addToCart: (state, action) => {
      const item = action.payload;
      const existingItemIndex = state.items.findIndex((i) => i._id === item._id);

      if (existingItemIndex !== -1) {
        // Si le produit existe, mise à jour de la quantité
        state.items = state.items.map((i, index) =>
          index === existingItemIndex ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Ajout d'un nouveau produit avec une quantité initiale de 1
        state.items = [...state.items, { ...item, quantity: 1 }];
      }
      // Recalcul la quantité totale
      state.totalQuantity = state.items.reduce((acc, i) => acc + i.quantity, 0);

      // Ajoute le prix du produit au prix total
      state.totalPrice += item.price;
    },

    removeCart: (state, action) => {
      const itemId = action.payload;
      const itemToRemove = state.items.find((i) => i._id === itemId);

      if (itemToRemove) {
        // Soustraire le prix du produit
        state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
        // Retire le produit du panier
        state.items = state.items.filter((i) => i._id !== itemId);
      }

      // Recalculer la quantité totale après suppression
      state.totalQuantity = state.items.reduce((acc, i) => acc + i.quantity, 0);
    },

    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex((i) => i._id === itemId);

      if (existingItemIndex !== -1 && quantity > 0) {
        const existingItem = state.items[existingItemIndex];
        // Calculer la différence de prix
        const priceDifference = (quantity - existingItem.quantity) * existingItem.price;
        state.totalPrice += priceDifference;

        // Mettre à jour la quantité
        state.items = state.items.map((i, index) =>
          index === existingItemIndex ? { ...i, quantity } : i

        )
        // Recalculer la quantité totale
        state.totalQuantity = state.items.reduce((acc, i) => acc + i.quantity, 0);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  }
});


export const { addToCart, removeCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
