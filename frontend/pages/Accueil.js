
import styles from "../styles/Accueil.module.css"
import Head from 'next/head';
import Header from "../components/Header";
import Product from "../components/Product";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import BuyModal from '../components/BuyModal';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from "../reducers/cart";
import { setLikedList } from "../reducers/user";

function Accueil() {

  const [categorie, setCategorie] = useState('');
  const [canape, setCanape] = useState([]);
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('');
  const [nothing, setNothing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedProducts, setLikedProducts] = useState([]);

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.value)


  const handleProductClick = (product) => {
    setSelectedProduct(product); // Met à jour le produit sélectionné
    setIsModalOpen(true); // Ouvre la modal
    dispatch(addToCart(product))
  };
  const closeBuyModal = () => {
    setIsModalOpen(false);
  };

  const handleHeart = (product) => {
    setSelectedProduct(product);
    setLikedProducts((prevLikedProducts) => {
      if (prevLikedProducts.some(p => p._id === product._id)) {
        // Si le produit est déjà liké, le retirer de la liste
        return prevLikedProducts.filter(p => p._id !== product._id);
      } else {
        // Sinon, l'ajouter à la liste des produits likés
        return [...prevLikedProducts, product];
      }
    });
  }


  // Fonction pour récupérer les produits par catégorie
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products?categorie=${categorie}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des produits');
        }
        const data = await response.json();
        setCanape(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    };
    fetchProductsByCategory(categorie);
  }, [categorie]);

  // Fonction pour gérer la recherche
  const handleSearch = async () => {
    if (search) {
      try {
        const response = await fetch(`http://localhost:3000/products/search?motscles=${search}`);
        const data = await response.json();

        if (data.length > 0) {
          setResults(data);  // Stocke les résultats s'ils existent
          setNothing(false); // Réinitialise l'état d'erreur
        } else {
          setNothing(true);  // Aucun produit trouvé
          setErrorMessage("Aucun produit ne correspond à votre recherche.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des résultats :", error);
        setNothing(true);  // En cas d'erreur dans la requête
        setErrorMessage("Erreur lors de la recherche des produits.");
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Appeler la fonction de recherche lors de l'appui sur Entrée
    }
  };


  // Liste des produits basés sur la recherche ou la catégorie
  const produitsAffiches = results.length > 0 ? results : canape;

  const listeProduitsAffiches = produitsAffiches.map((product) => (
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
    />
  ));

  return (
    <>
      <Head>
        <title>ConfoChic</title>
      </Head>
      <Header></Header>
      <div>
        <div className={styles.containerSearch}>
          <input
            type='text'
            placeholder="Recherche ..."
            onChange={(e) => { setSearch(e.target.value); setNothing(false) }} // Mettre à jour 'search' sur le changement d'input
            value={search}
            className={styles.inputSearch}
            onKeyDown={handleKeyPress} // Gérer la touche "Enter"
          />  {nothing && (
            <h4 style={{ color: 'red', fontWeight: 'normal', fontStyle: 'italic', textAlign: 'center' }}>
              {errorMessage}
            </h4>
          )}
          <button className={styles.btnInscription} onClick={() => setCategorie('canape')}>Canape</button>
          <button className={styles.btnConnexion} onClick={() => setCategorie('fauteuil')}>Fauteuil</button>
          <button className={styles.btnInscription} onClick={() => setCategorie('table_basse')}>Table basse</button>
          <button className={styles.btnConnexion} onClick={() => setCategorie('produit mystere')}>Produit mystere</button>
        </div>
        <div className={styles.containerProduct}>
          {listeProduitsAffiches.length > 0 ? (
            listeProduitsAffiches
          ) : (
            <p>Aucun produit trouvé pour cette recherche.</p>
          )};
        </div>
        <BuyModal isOpen={isModalOpen}
          onRequestClose={closeBuyModal}
          product={selectedProduct}
        />
      </div >

      < Footer ></Footer >


    </>
  );
}

export default Accueil;


// // Charger les canapés au lancement de la page
// useEffect(() => {
//   const fetchDefaultCanape = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/products?categorie=canape');
//       const data = await response.json();
//       setCanape(data);
//     } catch (error) {
//       console.error('Erreur lors de la récupération des canapés par défaut :', error);
//     }
//   };
//   fetchDefaultCanape();
// }, []);