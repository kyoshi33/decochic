import styles from '../styles/Product.module.css';
import { TbShoppingCartPlus } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";





function Product(props) {
  const { name, image, dimension, price, onProductClick } = props;


  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.productInfo}>
        <h3>{name}</h3>
        <p>{dimension}</p>
        <li key={props._id}>
          {name} - {price}€
        </li>
      </div>
      <div className={styles.evaluation}>
        <span className={styles.etoiles}>★★★★☆</span>
        <span className={styles.compteur}>(54)</span>
      </div>
      <div className={styles.productActions}>
        <FaHeart className={styles.favButton} />
        <p className={styles.price}>{price}€</p>
        <TbShoppingCartPlus onClick={() => {
          onProductClick(props)
        }} className={styles.buyButton} />
      </div>
    </div>
  )
}

export default Product;
