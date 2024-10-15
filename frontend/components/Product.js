import styles from '../styles/Product.module.css';
import { useState } from 'react';
import { TbShoppingCartPlus } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import BuyModal from './BuyModal';







function Product(props) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openBuyModal = () => {
    setIsModalOpen(true)
  }
  const closeBuyModal = () => {
    setIsModalOpen(false);
  };

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
        <TbShoppingCartPlus onClick={() => { openBuyModal(), console.log('Icon clicked') }} className={styles.buyButton} />
        <BuyModal isOpen={isModalOpen}
          onRequestClose={closeBuyModal}
        />
      </div>
    </div>
  )
}

export default Product;
