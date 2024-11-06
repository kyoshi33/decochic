
import styles from "../styles/Accueil.module.css"
import Head from 'next/head';
import Header from "../components/Header";
import Product from "../components/Product";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import BuyModal from '../components/BuyModal';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from "../reducers/cart";
import { FaSearchPlus } from 'react-icons/fa';



function Accueil() {

  const [categorie, setCategorie] = useState('canape');
  const [canape, setCanape] = useState([]);
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('');
  const [nothing, setNothing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedProducts, setLikedProducts] = useState([]);
  const [isZoomed, setIsZoomed] = useState(false);

  const dispatch = useDispatch()



  //zoom au clic sur le cv
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product); // Met à jour le produit sélectionné
    setIsModalOpen(true); // Ouvre la modal
    dispatch(addToCart(product))
  };
  const closeBuyModal = () => {
    setIsModalOpen(false);
  };

  // Fonction pour les likes
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


  // Fonction pour récupérer les produits par catégorie, initialisé d'origine a canape
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(`https://decochicbackend.vercel.app/products?categorie=${categorie}`);
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


  //Fonction de recherche par mots clés et de mise à 0 si effacement du mot
  const handleSearch = async () => {
    if (search.trim() === '') {
      setResults([]);      // Efface les résultats de recherche
      setNothing(false);    // Réinitialise l'état d'erreur
      fetchProductsByCategory(); // Remet les produits par défaut
      return;
    }

    try {
      const response = await fetch(`https://decochicbackend.vercel.app/products/search?motscles=${search}`);
      const data = await response.json();

      if (data.length > 0) {
        setResults(data);   // Stocke les résultats s'ils existent
        setNothing(false);  // Réinitialise l'état d'erreur
      } else {
        setResults([]);
        setNothing(true);
        setErrorMessage("Aucun produit ne correspond à votre recherche.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des résultats :", error);
      setNothing(true);
      setErrorMessage("Erreur lors de la recherche des produits.");
    }
  };

  // Charger les produits canape au refresh
  const fetchProductsByCategory = async () => {
    try {
      const response = await fetch(`https://decochicbackend.vercel.app/products?categorie=canape`);
      const data = await response.json();
      setCanape(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits :', error);
    }
  };

  // Appeler `fetchProductsByCategory` au démarrage
  useEffect(() => {
    fetchProductsByCategory();
  }, []);

  // Surveiller les changements de search
  useEffect(() => {
    handleSearch();
  }, [search]);


  //validation avec enter de la barre de recherche
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); //appel de la fonction
    }
  };


  // Liste des produits basés sur la recherche ou la catégorie
  const produitsAffiches = results.length > 0 ? results : canape;

  // Trier les produits pour afficher ceux en promotion en premier
  const produitsTries = produitsAffiches.sort((a, b) => {
    if (a.isOnSale && !b.isOnSale) return -1;
    if (!a.isOnSale && b.isOnSale) return 1;
    return 0;
  });

  // Mapper les produits triés pour l'affichage
  const listeProduitsAffiches = produitsTries.map((product) => (
    <Product
      key={product._id}
      _id={product._id}
      name={product.name}
      image={product.image}
      video={product.video}
      dimension={product.dimension}
      description={product.description}
      price={product.price}
      discountedPrice={product.discountedPrice}
      isOnSale={product.isOnSale}
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
            onChange={(e) => { setSearch(e.target.value); setNothing(false); }}
            value={search}
            className={styles.inputSearch}
            onKeyDown={handleKeyPress}
          />
          {nothing && (
            <h4 style={{ color: 'red', fontWeight: 'normal', fontStyle: 'italic', textAlign: 'center' }}>
              {errorMessage}
            </h4>
          )}
          <button className={styles.btnInscription} onClick={() => setCategorie('canape')}>Canape</button>
          <button className={styles.btnConnexion} onClick={() => setCategorie('fauteuil')}>Fauteuil</button>
          <button className={styles.btnInscription} onClick={() => setCategorie('table_basse')}>Table basse</button>
          <button className={styles.btnConnexion} onClick={() => setCategorie('produit_mystere')}>Produit mystere</button>
        </div>
        {categorie === 'produit_mystere' && (
          <div className={styles.mystere}>
            <video
              src="https://res.cloudinary.com/dtkyr0fbb/video/upload/v1730210340/video_de_presentation_djamtj.mp4"
              controls
              className={styles.productVideo}
            />
            <div className={styles.imageContainer}>
              <img
                src="https://res.cloudinary.com/dtkyr0fbb/image/upload/v1730236052/CV_mko9mj.png"
                className={styles.cv}
                alt="CV"
                onClick={toggleZoom} // Ouverture modal zoom au clic
              />
              <FaSearchPlus className={styles.zoomIcon} onClick={toggleZoom} />
            </div>

            {isZoomed && (
              <div className={styles.modal} onClick={toggleZoom}>
                <img
                  src="https://res.cloudinary.com/dtkyr0fbb/image/upload/v1730236052/CV_mko9mj.png"
                  className={styles.zoomedImage}
                  alt="CV Zoomed"
                />
              </div>
            )}
          </div>


        )}
        <div className={styles.containerProduct}>
          {categorie !== 'produit_mystere' && (
            listeProduitsAffiches.length > 0 ? (
              listeProduitsAffiches
            ) : (
              <p>Aucun produit trouvé pour cette recherche.</p>
            )
          )}
        </div>

        <BuyModal
          isOpen={isModalOpen}
          onRequestClose={closeBuyModal}
          product={selectedProduct}
        />
      </div >

      < Footer ></Footer >


    </>
  );
}

export default Accueil;
