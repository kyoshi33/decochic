import styles from '../styles/Product.module.css';
import { TbShoppingCartPlus } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { setLikedList } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Product(props) {
  const { _id, name, image, dimension, price, discountedPrice, description, onProductClick, onHeartClick, isOnSale, isProfilePage } = props;
  const [liked, setLiked] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if (user && user.liked && user.liked.includes(_id)) {
      setLiked(true);
    }
  }, [user, _id]);

  const like = async () => {
    if (!user.token) {
      toast.info("Merci de vous connecter pour liker un produit.", {
        autoClose: 3000,
      });
      return;
    }
    const id = props._id;
    const { email, token } = user;
    const response = await fetch("https://decochicbackend-juliens-projects-465b0188.vercel.app/users/like", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, id, token }),
    });
    const result = await response.json();
    setLiked(!liked);
    onHeartClick(props);
    dispatch(setLikedList(result.liked));
  };

  const addToCart = () => {
    if (!user.token) {
      toast.info("Merci de vous connecter pour ajouter un produit au panier.", {
        autoClose: 3000,
      });
      return;
    }
    onProductClick(props);
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.productInfo}>
        <h3>{name}</h3>
        <p>{dimension}</p>
        <p key={_id}>{description}</p>
      </div>

      {!isProfilePage && (
        <div className={styles.evaluation}>
          <span className={styles.etoiles}>★★★★☆</span>
          <span className={styles.compteur}>(54)</span>
        </div>
      )}

      {/* Affichage du prix et du texte "Prix en baisse" si en promotion */}
      {isOnSale ? (
        <div className={styles.promoSection}>
          <p className={styles.promoTitle}>Prix en baisse</p>
          <p className={styles.oldPrice}>{price}€</p>
          <p className={styles.newPrice}>{discountedPrice}€</p>
        </div>
      ) : (
        <p className={styles.price}>{price}€</p>
      )}

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
      <ToastContainer position="top-center" />
    </div>
  )
}

export default Product;
