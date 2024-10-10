import styles from '../styles/Header.module.css';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { ImExit } from "react-icons/im";
import { useDispatch } from "react-redux";
import { logout } from '../reducers/user';
import { useRouter } from 'next/router'




//Composant header présent dans plusieurs des pages du site
function Header() {


  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const router = useRouter();


  const handleLogout = () => {
    dispatch(logout());
    router.push({ pathname: '/Accueil' })
  }

  const lettreEnCapital = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };


  let topMenu =
    <div className={styles.container}>
      <Link href='/SignUp'>
        <button className={styles.btnInscription}>Inscription</button>
      </Link>

      <Link href='/Login'>
        <button className={styles.btnConnexion}>Connexion</button>
      </Link>
    </div>

  if (user.token) {
    topMenu =
      <div className={styles.container}>
        <div className={styles.profilConnecter}>
          <h3 className={styles.text}>Bonjour {lettreEnCapital(user.firstName)} !</h3> <span className={styles.icon}>👋</span>
          <Link href='/Accueil' >
            <ImExit className={styles.exitIcon} onClick={() => handleLogout()} />
          </Link>
        </div>
      </div>

  }


  return (
    <header className={styles.Container}>
      <Link href='/Accueil'>
        <img src="logo.jpg" alt="Logo du site" className={styles.logo} />
      </Link>
      <div className={styles.topTitle}>
        <h1 className={styles.title}>Confo<span>Chic</span></h1>
        <p className={styles.subtitle}>Sofas • Armchairs • Coffee Tables</p>
      </div>
      {topMenu}
    </header>
  )
}

export default Header;
