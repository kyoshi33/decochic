import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],  // Liste des articles du panier
  totalPrice: 0,  // Prix total du panier
  totalQuantity: 0,
};


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    addToCart: (state, action) => {
      const item = action.payload;
      const existingItemIndex = state.items.findIndex((i) => i._id === item._id);
      console.log("Prix avant ajout :", state.totalPrice);
      if (existingItemIndex !== -1) {
        // Si le produit existe, mettre à jour la quantité
        state.items = state.items.map((i, index) =>
          index === existingItemIndex ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Ajouter un nouveau produit avec une quantité initiale de 1
        state.items = [...state.items, { ...item, quantity: 1 }];
      }
      // Recalculer la quantité totale
      state.totalQuantity = state.items.reduce((acc, i) => acc + i.quantity, 0);

      // Ajouter le prix du produit au prix total
      state.totalPrice += item.price;
    },

    removeCart: (state, action) => {
      const itemId = action.payload;
      const itemToRemove = state.items.find((i) => i._id === itemId);

      if (itemToRemove) {
        // Soustraire le prix du produit
        state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
        // Retirer le produit du panier
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


// router.post("/commandes", async (req, res) => {
//   const { email, token, cart, paymentIntentId, totalAmount } = req.body;

//   // Trouver l'utilisateur avec l'email et le token
//   const foundUser = await User.findOne({ email, token });

//   if (!foundUser) {
//     return res.status(403).json({ result: false, error: 'Accès refusé - Utilisateur introuvable' });
//   }
//   console.log('Panier au moment de la commande:', cart);
//   try {
//     // Ajouter une nouvelle commande à l'utilisateur
//     const newCommande = {
//       orderId: new mongoose.Types.ObjectId(),
//       productId: cart.map(item => item._id), // Cart contient les IDs des produits achetés
//       createdAt: new Date(),
//       totalAmount: totalAmount,
//     };
//     foundUser.commandes.push(newCommande);
//     // Sauvegarder l'utilisateur avec la nouvelle commande
//     await foundUser.save();

//     res.json({ result: true, message: 'Commande ajoutée avec succès', commandesList: foundUser.commandes });
//   } catch (error) {
//     console.error('Erreur lors de l\'enregistrement de la commande :', error);
//     res.status(500).json({ result: false, error: 'Erreur lors de l\'enregistrement de la commande' });
//   }
// });


// router.get("/commandesProducts", async (req, res) => {
//   try {
//     // Récupérer l'utilisateur et utiliser populate sur productId dans commandes
//     const foundUser = await User.findOne({ email: req.query.email, token: req.query.token })
//       .populate({
//         path: 'commandes.productId', // Populate pour récupérer les détails des produits
//         model: 'products', // Assurez-vous que "products" correspond au nom du modèle
//       });

//     if (!foundUser) {
//       console.log('Accès refusé - Utilisateur introuvable');
//       return res.status(404).json({ result: false, error: 'Utilisateur introuvable' });
//     }

//     console.log('Produits achetés renvoyés:', foundUser.commandes);
//     res.json({ result: true, commandesProducts: foundUser.commandes });
//   } catch (error) {
//     console.error('Erreur lors de la récupération des produits achetés:', error);
//     res.status(500).json({ result: false, error: 'Erreur lors de la récupération des produits achetés' });
//   }
// });
