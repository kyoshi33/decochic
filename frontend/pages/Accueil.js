
import styles from "../styles/Accueil.module.css"
import Head from 'next/head';
import Header from "../components/Header";
import Product from "../components/product";
import Footer from "../components/Footer";
import { useState } from "react";




function Accueil() {

  const [placeHolder, setPlaceHolder] = useState('Recherche ...');




  return (
    <>
      <Head>
        <title>ConfoChic</title>
      </Head>
      <Header></Header>
      <div>
        <div className={styles.containerSearch}>
          <input type='string' placeholder={placeHolder} className={styles.inputSearch} />
          <button className={styles.btnInscription}>Canape</button>
          <button className={styles.btnConnexion}>Fauteuil</button>
          <button className={styles.btnInscription}>Table basse</button>
          <button className={styles.btnConnexion}>Produit mystere</button>

        </div>
        <div className={styles.containerProduct}>
          <Product></Product>
        </div>
      </div >

      < Footer ></Footer >


    </>
  );
}

export default Accueil;
