import styles from '../styles/Product.module.css';
import { TbShoppingCartPlus } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { setLikedList } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';





function Product(props) {
  const { _id, name, image, dimension, price, onProductClick, onHeartClick } = props;
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








  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.productInfo}>
        <h3>{name}</h3>
        <p>{dimension}</p>
        <li key={_id}>
          {name} - {price}€
        </li>
      </div>
      <div className={styles.evaluation}>
        <span className={styles.etoiles}>★★★★☆</span>
        <span className={styles.compteur}>(54)</span>
      </div>
      <div className={styles.productActions}>
        <FaHeart
          onClick={() => like(props)}
          className={liked ? styles.favButtonLiked : styles.favButton} />
        <p className={styles.price}>{price}€</p>
        <TbShoppingCartPlus onClick={() => {
          onProductClick(props)
        }} className={styles.buyButton} />
      </div>
    </div>
  )
}

export default Product;
