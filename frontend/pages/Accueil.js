
import styles from "../styles/Accueil.module.css"
import Head from 'next/head';
import Header from "../components/header";



function Accueil() {
  let display =
    <div className={styles.container}>
      <div className={styles.choiceContainer}>
        <div className={styles.advice}>Bienvenue sur CONFOCHIC
        </div>
      </div>
    </div >


  return (
    <>
      <Head>
        <title>Decochic</title>
      </Head>
      <Header></Header>
      {display}


    </>
  );
}

export default Accueil;
