import styles from '../styles/Profil.module.css';
import Head from 'next/head';
import Header from "../components/Header";
import Product from "../components/Product";
import Footer from "../components/Footer";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { useRouter } from 'next/router';

function Profil() {

  const [selectedTab, setSelectedTab] = useState(1);
  const [mesLikes, setMesLikes] = useState([]);
  const [mesAchats, setMesAchats] = useState([]);
  const [reRender, setReRender] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const router = useRouter();

  // Redirection si non authentifié
  useEffect(() => {
    if (!user.token) {
      router.push({ pathname: '/' });
    }
  }, [user.token]);


  // Récupération des produits likés
  const clickMesLikes = () => {
    const { email, token } = user;
    fetch(`http://localhost:3000/users/likesProducts?email=${email}&token=${token}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        if (!data || !Array.isArray(data.likedProducts)) {
          console.error('Erreur lors de la récupération des likes ou données invalides');
        } else {
          setMesLikes(data.likedProducts);  // Met à jour le state avec les produits likés
        }
      });
  };

  // Récupération des achats
  const clickMesAchats = () => {
    const { email, token } = user;
    fetch(`http://localhost:3000/users/commandes?email=${email}&token=${token}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        if (!data || !Array.isArray(data.commandesList)) {
          console.error('Erreur lors de la récupération des achats ou données invalides');
        } else {
          setMesAchats(data.commandesList);  // Met à jour le state avec les commandes
        }
      });
  };

  // Gestion des onglets pour afficher les produits likés ou les achats
  useEffect(() => {
    if (selectedTab === 1) {
      clickMesLikes();
    } else if (selectedTab === 2) {
      clickMesAchats();
    }
  }, [selectedTab]);


  // Générer la liste des produits likés
  const listeProduitsLikes = mesLikes.map((product) => (
    <Product
      key={product._id}
      _id={product._id}
      name={product.name}
      image={product.image}
      dimension={product.dimension}
      description={product.description}
      price={product.price}
      product={product}
      onProductClick={() => console.log('Product clicked:', product._id)}
      onHeartClick={() => console.log('Like clicked:', product._id)}
    />
  ));

  // Générer la liste des produits achetés
  const listeProduitsAcheter = mesAchats.map((product) => (

    <Product
      key={product._id}
      _id={product._id}
      name={product.name}
      image={product.image}
      dimension={product.dimension}
      price={product.price}
      product={product}
      onProductClick={() => console.log('Product clicked:', product._id)}
      onHeartClick={() => console.log('Like clicked:', product._id)}
    />

  ));

  // Affichage en fonction de l'onglet sélectionné
  let display;
  if (selectedTab === 1) {
    display = (
      <div className={styles.modelChoiceContainer}>
        <div className={styles.scrollWindow}>
          {listeProduitsLikes}
        </div>
      </div>
    );
  } else if (selectedTab === 2) {
    display = (
      <div className={styles.modelChoiceContainer}>
        <div className={styles.scrollWindow}>
          {listeProduitsAcheter}
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>ConfoChic</title>
      </Head>
      <Header />

      {/* Onglets pour basculer entre produits favoris et achats */}
      <div className={styles.container}>
        <div className={styles.tabBar}>
          <div
            className={selectedTab === 1 ? styles.selectedTab : styles.tab}
            onClick={() => setSelectedTab(1)}
          >
            Produits Favoris
          </div>
          <div
            className={selectedTab === 2 ? styles.selectedTab : styles.tab}
            onClick={() => setSelectedTab(2)}
          >
            Mes Achats
          </div>
        </div>

        {/* Affichage conditionnel des produits likés ou des achats */}
        <div className={styles.productsContainer}>
          {selectedTab === 1 ? (
            listeProduitsLikes.length > 0 ? (
              listeProduitsLikes
            ) : (
              <p>Pas de produits favoris pour l'instant...</p>
            )
          ) : (
            listeProduitsAcheter.length > 0 ? (
              listeProduitsAcheter
            ) : (
              <p>Pas d'achats effectués pour l'instant...</p>
            )
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profil;