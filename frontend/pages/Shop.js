
import styles from "../styles/Shop.module.css"
import Head from 'next/head';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeCart } from "../reducers/cart";
import { useState } from "react";

function Shop() {

  const [update, setUpdate] = useState(false);
  const cart = useSelector((state) => state.cart.items); // Récupérer les produits dans le panier
  const totalPrice = useSelector((state) => state.cart.totalPrice); // Récupérer le prix total
  const dispatch = useDispatch();


  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ itemId, quantity: newQuantity }));
      setUpdate(!update);  // Forcer la mise à jour du composant
    }
  };

  const handleRemove = (itemId) => {
    dispatch(removeCart(itemId));
  };

  const handleValid = async () => {
    const dataBuy = {

    }
  }

  const uploadPrompt = async () => {
  }

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>ConfoChic</title>
        </Head>
        <Header></Header>
        <div>

          {cart.length > 0 ? (
            <div className={styles.containerProduct}>
              {cart.map((item) => (
                <div key={item._id} className={styles.cartItem}>
                  <img src={item.image} alt={item.name} className={styles.cartItemImage} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.price}€</p>
                    <div>
                      <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</button>
                    </div>
                    <button onClick={() => handleRemove(item._id)}>Supprimer</button>
                  </div>
                </div>
              ))}
              <div>
                <h2>Total : {totalPrice.toFixed(2)}€</h2>
                <button onClick={() => { handleValid(), alert('Commande validée') }}>Passer commande</button>
              </div>
            </div>
          ) : (
            <p>Votre panier est vide.</p>
          )}
        </div>
        < Footer ></Footer >
      </div>
    </>
  );
}

export default Shop;

