import styles from '../styles/BuyModal.module.css';
import React from "react";
import Modal from 'react-modal';
import { useState } from 'react';
import { useRouter } from 'next/router'



//Composant signalement / enregistrement du texte / informations id
function BuyModal(props) {

  const router = useRouter();

  const onClose = () => {
    props.onRequestClose();
  }
  const openShopping = () => {
    router.push({ pathname: '/Shop' })
  }



  return (

    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      className={styles.modal}>
      <div className={styles.modalHeader}>
        <h2>Ajouté au panier</h2>
        <div className={styles.productAdded}>
          <img src={props.image} alt={props.name} className={styles.productImage} />
          <div>
            <h3>{props.name}</h3>
            <p>{props.price}€</p>
          </div>
        </div>
      </div>

      <div className={styles.recommendations}>
        <h3>Pour compléter votre commande</h3>
        {/* {recommendations.map((item) => (
          <div key={item.id} className={styles.recommendationItem}>
            <img src={item.image} alt={item.name} className={styles.recommendationImage} />
            <div>
              <h4>{item.name}</h4>
              <p>{item.price}€</p>
            </div>
            <button className={styles.addToCartButton}>Ajouter</button>
          </div>
        ))} */}
      </div>

      <div className={styles.modalFooter}>
        <button onClick={onClose} className={styles.continueShoppingButton}>Continuer les achats</button>
        <button onClick={openShopping} className={styles.viewCartButton}>Voir mon panier</button>
      </div>
    </Modal>
  );
}


export default BuyModal;
