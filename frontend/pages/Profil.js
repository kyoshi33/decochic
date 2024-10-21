import styles from '../styles/Profil.module.css';
import Head from 'next/head';
import Header from "../components/Header";
import Product from "../components/Product";
import Footer from "../components/Footer";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { useRouter } from 'next/router';
import { setLikedList } from '../reducers/user';

function Profil() {

  const [selectedTab, setSelectedTab] = useState(1);
  const [mesLikes, setMesLikes] = useState([]);
  const [mesAchats, setMesAchats] = useState([]);
  const [reRender, setReRender] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value)
  const router = useRouter()


  useEffect(() => {
    if (!user.token) {
      router.push({ pathname: '/' });
    }
  }, [user.token]);

  const handleLogout = () => {
    dispatch(logout());
    router.push({ pathname: '/' })
  }
  // Recuperation et mise a jour des likes
  const clickMesLikes = () => {
    const { email, token } = user;
    fetch(`http://localhost:3000/users/likes?email=${email}&token=${token}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        if (!data) {
          console.error('Erreur lors de la récupération des likes');
        } else {
          setMesLikes(data.liked);  // Met à jour le state avec les produits likés
        }
      });
  };


  // Fonction pour afficher mes achats
  const clickMesAchats = () => {
    const { email, token } = user;
    fetch(`http://localhost:3000/users/commandes?email=${email}&token=${token}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        if (!data) {
          console.error('Erreur lors de la récupération des achats');
        } else {
          setMesAchats(data.commandes);  // Met à jour le state avec les commandes
        }
      });
  };

  useEffect(() => {
    if (selectedTab === 1) {
      clickMesLikes();
    } else if (selectedTab === 2) {
      clickMesAchats();
    }
  }, [selectedTab, reRender]);

  const refresh = () => {
    setReRender(!reRender);
  }


  const listeProduitsLikes = mesLikes.map((product) => (
    <Product
      key={product._id}
      _id={product._id}
      name={product.name}
      image={product.image}
      dimension={product.dimension}
      price={product.price}
      product={product}
      onProductClick={handleProductClick}
      onHeartClick={handleHeart}
      reRender={refresh}
    />
  ));


  const listeProduitsAcheter = mesAchats.map((product) => (
    <Product
      key={product._id}
      _id={product._id}
      name={product.name}
      image={product.image}
      dimension={product.dimension}
      price={product.price}
      product={product}
      onProductClick={handleProductClick}
      onHeartClick={handleHeart}
      reRender={refresh}
    />
  ));


  let display =
    <div className={styles.modelChoiceContainer}>
      {listeProduitsLikes}
    </div>
  if (selectedTab === 1) {
    display =
      <div className={styles.modelChoiceContainer}>
        <div className={styles.scrollWindow}>
          <div className={styles.promptCard} >
            {listeProduitsLikes}
          </div>
        </div>
      </div>
  } else if (selectedTab === 2) {
    display =
      <div className={styles.modelChoiceContainer}>
        <div className={styles.scrollWindow}>
          <div className={styles.promptCard} >
            {listeProduitsAcheter}
          </div>
        </div>
      </div>
  }







  return (
    <>
      <Head>
        <title>ConfoChic</title>
      </Head>
      <Header></Header>
      <div className={styles.container}>


        <div className={styles.selectModelContainer}>
          <div className={styles.tabBar}>
            <div className={selectedTab === 1 ? styles.selectedTab : styles.tab} onClick={() => { setSelectedTab(1) }} >
              Produits Favoris
            </div>
            <div className={selectedTab === 2 ? styles.selectedTab : styles.tab} onClick={() => { setSelectedTab(2) }} >
              Mes achats
            </div>
          </div>
          <div className={styles.display}>
            {display}
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.btn} onClick={() => router.push('/Accueil')}>
            Retour
          </div>
        </div>
      </div >

      < Footer ></Footer >
    </>
  );
}

export default Profil;

