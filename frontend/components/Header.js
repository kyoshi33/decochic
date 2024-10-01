import styles from '../styles/Header.module.css';
import Link from 'next/link';




//Composant header présent dans plusieurs des pages du site
function Header() {


  let topMenu =
    <div className={styles.container}>
      {/* <Link href='/SignUp'> */}
      <button className={styles.btnInscription}>Inscription</button>




      <button className={styles.btnConnexion}>Connexion</button>

    </div>


  return (
    <header className={styles.Container}>
      {/* <Link href='/Accueil'>
      </Link> */}

      <img src="logo.jpg" alt="Description de l'image" className={styles.logo} />
      <div className={styles.topTitle}>
        <h1 className={styles.title}>confo<span>Chic</span></h1>
        <p className={styles.subtitle}>Sofas • Armchairs • Coffee Tables</p>
      </div>
      {topMenu}
    </header>
  )
}

export default Header;
