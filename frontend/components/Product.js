import styles from '../styles/Product.module.css';
import { TbShoppingCartPlus } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";





function Product(props) {
  const { _id, name, image, dimension, price, onProductClick, onHeartClick } = props;
  const [liked, setLiked] = useState(false);

  const handleHeartClick = () => {
    setLiked(!liked); // Alterner l'état du like
    onHeartClick(props); // Appeler la fonction pour enregistrer le like
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
          onClick={handleHeartClick}
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
