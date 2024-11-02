import styles from '../styles/BuyModal.module.css';
import React, { useState } from "react";
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../reducers/cart";
import { FaCheckCircle } from 'react-icons/fa';
import { BsPlusCircle } from 'react-icons/bs';

function BuyModal(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [addedItems, setAddedItems] = useState([]);

  const onClose = () => {
    props.onRequestClose();
  };

  const openShopping = () => {
    addToCart(product);
    router.push({ pathname: '/Shop' });
  };

  const isAdded = (item) => {
    return addedItems.some(addedItem => addedItem._id === item._id);
  };

  const handleAddClick = (item) => {
    const itemExistsInCart = cartItems.some(cartItem => cartItem._id === item._id);

    if (!itemExistsInCart) {
      dispatch(addToCart(item));
      setAddedItems([...addedItems, item]);
    }
  };

  const { product } = props;
  if (!product) {
    return null;
  }

  const recommendations = [
    { _id: 1, name: 'Housse de Canapé extensible', price: 129, image: 'housse.jpg' },
    { _id: 2, name: 'Proteger votre sol avec nos pattins', price: 5.99, image: 'pattins.jpg' },
    { _id: 3, name: 'Plaid gris/blanc 140*200cm', price: 9.99, image: 'plaid.jpg' },
    { _id: 4, name: 'Entretien de vos produits', price: 9.99, image: 'rouleau.jpg' },
  ];

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      className={styles.modal}
    >
      <div className={styles.modalHeader}>
        <h2>Ajouté au panier</h2>
        <div className={styles.productAdded}>
          <img src={product.image} alt={product.name} className={styles.productImage} />
          <div>
            <h3>{product.name}</h3>
            <p>{product.price}€</p>
          </div>
        </div>
      </div>

      <div className={styles.recommendations}>
        <h3>Pour compléter votre commande</h3>
        {recommendations.map((item) => (
          <div key={item.id} className={styles.recommendationItem}>
            <img src={item.image} alt={item.name} className={styles.recommendationImage} />
            <div>
              <h4>{item.name}</h4>
              <p>{item.price}€</p>
            </div>
            <button
              onClick={() => handleAddClick(item)}
              className={`${styles.addToCartButton} ${isAdded(item) ? styles.added : ''}`}
              disabled={isAdded(item)}
            >
              {isAdded(item) ? (
                <FaCheckCircle className={styles.addedIcon} />
              ) : (
                <BsPlusCircle className={styles.addIcon} />
              )}
              {isAdded(item) ? ' Ajouté' : ' Ajouter'}
            </button>
          </div>
        ))}
        <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.continueShoppingButton}>Continuer les achats</button>
          <button onClick={openShopping} className={styles.viewCartButton}>Voir mon panier</button>
        </div>
      </div>
    </Modal>
  );
}

export default BuyModal;