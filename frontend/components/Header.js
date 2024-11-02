import styles from '../styles/Header.module.css';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { ImExit } from "react-icons/im";
import { useDispatch } from "react-redux";
import { logout } from '../reducers/user';
import { useRouter } from 'next/router';
import { FaCartArrowDown } from "react-icons/fa";





//Composant header présent dans plusieurs des pages du site
function Header() {


  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const router = useRouter();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);


  const handleLogout = () => {
    dispatch(logout());
    router.push({ pathname: '/Accueil' }).then(() => {
      window.location.reload();
    });
  }

  const handleLogo = () => {
    if (router.pathname === '/Accueil') {
      router.reload();
    } else {
      router.push({ pathname: '/Accueil' });
    }
  };


  const handleProfil = () => {
    router.push({ pathname: '/Profil' })
  }

  const lettreEnCapital = (string) => {
    if (typeof string !== 'string' || string.length === 0) {
      return 'toi';
    }
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  let topMenu =
    <div className={styles.container}>
      <div className={styles.connect}>
        <Link href='/SignUp'>
          <button className={styles.btnInscription}>Inscription</button>
        </Link>

        <Link href='/Login'>
          <button className={styles.btnConnexion}>Connexion</button>
        </Link>
      </div>
    </div>

  if (user.token) {
    topMenu =
      <div className={styles.container}>
        <div className={styles.profilConnecter}>
          <h3 className={styles.text} onClick={() => handleProfil()}>Bonjour {user.civilite} {lettreEnCapital(user.firstName)} !</h3> <span className={styles.icon}>👋</span>
          <Link href='/Shop' >
            <div>
              <FaCartArrowDown
                className={`${styles.cart} ${totalQuantity > 0 ? 'active' : ''}`}
              />
              {totalQuantity > 0 && (
                <span className={styles.quantity}>{totalQuantity}</span>
              )}
            </div>
          </Link>
          <Link href='/Accueil' >
            <ImExit className={styles.exitIcon} onClick={() => handleLogout()} />
          </Link>
        </div>
      </div>

  }


  return (
    <header className={styles.Container}>
      <div className={styles.histoire}>
        <Link href='/Accueil'>
          <img src="logo.jpg" alt="Logo du site" className={styles.logo} onClick={() => handleLogo()} />
        </Link>
        <Link href='/Histoire'>
          <h2 className={styles.titre}>Notre histoire</h2>
        </Link>

      </div>
      <div className={styles.topTitle}>
        <h1 className={styles.title}>Confo<span>Chic</span></h1>
        <p className={styles.subtitle}>Le confort au bout du clic</p>
      </div>
      {topMenu}
    </header>
  )
}

export default Header;
