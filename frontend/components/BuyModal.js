import styles from '../styles/BuyModal.module.css';
import React from "react";
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import { useDispatch } from "react-redux";
import { addToCart } from "../reducers/cart";
import { FaCheckCircle } from 'react-icons/fa';
import { useState } from "react";
import { BsPlusCircle } from 'react-icons/bs';

function BuyModal(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [addedItems, setAddedItems] = useState([]);
  // const user = useSelector((state => state.user.value));
  // if (!user.token) {
  //   router.push({ pathname: '/Accueil' });
  //   console.error("merci de vous connecter");
  // }


  const onClose = () => {
    props.onRequestClose();
  };

  const openShopping = () => {
    addToCart(product);
    router.push({ pathname: '/Shop' });
  };
  const isAdded = (item) => {
    return addedItems.includes(item); // Vérifier si l'élément est déjà ajouté
  };

  const handleAddClick = (item) => {
    dispatch(addToCart(item)); // Dispatcher l'action addToCart via Redux
    setAddedItems([...addedItems, item]); // Ajouter l'élément aux items déjà ajoutés
  };

  // Vérifie que product existe avant d'accéder à ses propriétés
  const { product } = props;
  if (!product) {
    return null;
  }

  const recommendations = [
    { id: 1, name: 'Housse de Canapé extensible', price: 129, image: 'housse.jpg' },
    { id: 2, name: 'Proteger votre sol avec nos pattins', price: 5.99, image: 'pattins.jpg' },
    { id: 3, name: 'Plaid gris/blanc 140*200cm', price: 9.99, image: 'plaid.jpg' },
    { id: 4, name: 'Entretien de vos produits', price: 9.99, image: 'rouleau.jpg' },
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
        {/* {recommendations.map((item) => ( */}
        {recommendations.map((item) => (
          <div key={item.id} className={styles.recommendationItem}>
            <img src={item.image} alt={item.name} className={styles.recommendationImage} />
            <div>
              <h4>{item.name}</h4>
              <p>{item.price}€</p>
            </div>
            <button onClick={() => handleAddClick(item)}
              className={styles.addToCartButton}
              disabled={isAdded(item)} // Désactiver le bouton si déjà ajouté
            >Ajouter{isAdded(item) ? (
              <FaCheckCircle className={styles.addedIcon} /> // Afficher la croix verte si ajouté
            ) : (
              <BsPlusCircle className={styles.addIcon} /> // Afficher l'icône d'ajout
            )}</button>
          </div>
        ))}
      </div>
      <div className={styles.modalFooter}>
        <button onClick={onClose} className={styles.continueShoppingButton}>Continuer les achats</button>
        <button onClick={openShopping} className={styles.viewCartButton}>Voir mon panier</button>
      </div>
    </Modal>
  );
}


export default BuyModal;
{/* <img src="housse.jpg" alt="housse de canape" className={styles.recommendationImage} />
          <div>
            <h4>Housse de Canapé extensible</h4>
            <p>129€</p>
          </div>
          <button onClick={() => addToCart(product)} className={styles.addToCartButton}>Ajouter</button>
        </div>
        <div className={styles.recommendationItem}>
          <img src="pattins.jpg" alt="protection pieds" className={styles.recommendationImage} />
          <div>
            <h4>Proteger votre sol avec nos pattins</h4>
            <p>5,99€</p>
          </div>
          <button onClick={() => addToCart(product)} className={styles.addToCartButton}>Ajouter</button>
        </div>
        <div className={styles.recommendationItem}>
          <img src="plaid.jpg" alt="plaid" className={styles.recommendationImage} />
          <div>
            <h4>Plaid gris/blanc  140*200cm </h4>
            <p>9,99€</p>
          </div>
          <button onClick={() => addToCart(product)} className={styles.addToCartButton}>Ajouter</button>
        </div>
        <div className={styles.recommendationItem}>
          <img src="rouleau.jpg" alt="rouleau de nettoyage" className={styles.recommendationImage} />
          <div>
            <h4>Entretien de vos produits, brosses</h4>
            <p>14,99€</p>
          </div>
          <button onClick={() => addToCart(product)} className={styles.addToCartButton}>Ajouter</button>
        </div>
        ))} */}