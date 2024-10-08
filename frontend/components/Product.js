import styles from '../styles/Product.module.css';
import { FaCreditCard } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { TbShoppingCartPlus } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";





function Product() {

  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <img src="friheten.jpg" />
      </div>
      <div className={styles.productInfo}>
        <h3>Friheten</h3>
        <p>180*200</p>
      </div>
      <div className={styles.evaluation}>
        <span className={styles.etoiles}>★★★★☆</span>
        <span className={styles.compteur}>(54)</span>
      </div>
      <div className={styles.productActions}>
        <FaHeart className={styles.favButton} />
        <p className={styles.price}>199€</p>
        <TbShoppingCartPlus className={styles.buyButton} />
      </div>
    </div>
  )
}

export default Product;
