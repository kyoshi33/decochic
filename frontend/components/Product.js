import styles from '../styles/Product.module.css';
import { TbShoppingCartPlus } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";






function Product(props) {


  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <img src={props.image} alt={props.name} />
      </div>
      <div className={styles.productInfo}>
        <h3>{props.name}</h3>
        <p>{props.dimension}</p>
        <li key={props._id}>
          {props.name} - {props.price}€
        </li>
      </div>
      <div className={styles.evaluation}>
        <span className={styles.etoiles}>★★★★☆</span>
        <span className={styles.compteur}>(54)</span>
      </div>
      <div className={styles.productActions}>
        <FaHeart className={styles.favButton} />
        <p className={styles.price}>{props.price}€</p>
        <TbShoppingCartPlus className={styles.buyButton} />

      </div>
    </div>
  )
}

export default Product;
