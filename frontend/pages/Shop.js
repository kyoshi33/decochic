import styles from "../styles/Shop.module.css"
import Head from 'next/head';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeCart } from "../reducers/cart";
import { useState } from "react";
import StripeForms from "../modules/StripeForms";




function Shop() {
  const [update, setUpdate] = useState(false);
  const cart = useSelector((state) => state.cart.items); // Récupérer les produits dans le panier
  const totalPrice = useSelector((state) => state.cart.totalPrice); // Récupérer le prix total
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(true); // Ouvre la modal 

  };

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#0070f3',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'Arial, sans-serif',
      spacingUnit: '4px',
      borderRadius: '6px',
    },
  };
  const options = {
    appearance,
  };

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
                    <div className={styles.designation}>
                      <h3 className={styles.name}>{item.name}</h3>
                      <p>{item.description}</p>
                      <p className={styles.price}>{item.price}€</p>

                    </div>
                    <div className={styles.action}>
                      <button className={styles.button} onClick={() => handleQuantityChange(item._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                      <span>{item.quantity}</span>
                      <button className={styles.button} onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</button>
                    </div>
                    <div className={styles.delete}>
                      <button className={styles.button} onClick={() => handleRemove(item._id)}>Supprimer</button>
                    </div>
                  </div>
                </div>
              ))}
              <div>
                <h2>Total : {totalPrice.toFixed(2)}€</h2>
                <button className={styles.buyButton} onClick={() => { handleValid() }}>Passer commande</button>
                {isModalOpen && (
                  <div className={styles.modal}>
                    <div className={styles.modalContent}>
                      <h2>Paiement</h2>

                      <StripeForms options={options} cart={cart} totalPrice={totalPrice} />

                      <button onClick={() => setIsModalOpen(false)}>Fermer</button>

                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className={styles.panierVide}>Votre panier est vide...</p>
          )}
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Shop;