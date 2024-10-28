import styles from '../styles/Product.module.css';
import { TbShoppingCartPlus } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { setLikedList } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';





function Product(props) {
  const { _id, name, image, dimension, price, description, onProductClick, onHeartClick, isProfilePage } = props;
  const [liked, setLiked] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value)




  //Mise a jour des like à l'ouverture de la page
  useEffect(() => {
    if (user && user.liked && user.liked.includes(_id)) {
      setLiked(true); // Si le produit est dans les likes de l'utilisateur
    }
  }, [user, _id]);


  // Route pour l'envoi et la sauvegarde des likes
  const like = async () => {
    if (!user.token) {
      alert("Merci de vous connecter pour liker un produit.");
      return;
    }
    const id = props._id;
    const { email, token } = user;
    const response = await fetch("http://localhost:3000/users/like", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, id, token }), // Envoie l'ID du produit, email et token
    });
    const result = await response.json();
    setLiked(!liked); // Alterner l'état du bouton "like"
    onHeartClick(props); // Appeler la fonction pour enregistrer le like
    dispatch(setLikedList(result.liked)); // Mise à jour de la liste des produits likés
  };

  // Fonction pour gérer l'ajout au panier
  const addToCart = () => {
    if (!user.token) {
      alert("Merci de vous connecter pour ajouter un produit au panier.");
      return;
    }
    onProductClick(props);  // Appeler la fonction d'ajout au panier, reutiliser dans Accueil
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.productInfo}>
        <h3>{name}</h3>
        <p>{dimension}</p>
        <p key={_id}>
          {description}
        </p>
      </div>
      {!isProfilePage && (
        <div className={styles.evaluation}>
          <span className={styles.etoiles}>★★★★☆</span>
          <span className={styles.compteur}>(54)</span>
        </div>
      )}
      <p className={styles.price}>{price}€</p>
      <div className={styles.productActions}>
        {!isProfilePage && (
          <>
            <FaHeart
              onClick={() => like(props)}
              className={liked ? styles.favButtonLiked : styles.favButton}
            />
            <TbShoppingCartPlus onClick={() => addToCart()} className={styles.buyButton} />
          </>
        )}

      </div>
    </div>
  )
}

export default Product;
