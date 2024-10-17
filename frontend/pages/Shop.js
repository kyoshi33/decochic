
import styles from "../styles/Shop.module.css"
import Head from 'next/head';
import Header from "../components/Header";
import Product from "../components/product";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

function Shop() {


  return (

    <div>
      <h2>Ajouté au panier</h2>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}€</p>
      <button onClick={() => addToCart(product)}>Ajouter au panier</button>
      <button onClick={onRequestClose}>Fermer</button>
      <button onClick={goToCart}>Voir mon panier</button>
    </div>
      </Modal >
    );
}



return (
  <>
    <Head>
      <title>ConfoChic</title>
    </Head>
    <Header></Header>


    < Footer ></Footer >


  </>
);
}

export default Shop;
