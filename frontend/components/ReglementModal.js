// import React, { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import styles from "../styles/ReglementModal.module.css"

// const ReglementModal = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleValid = async () => {
//     setIsModalOpen(true); // Ouvre la modal quand on clique sur "Passer commande"
//   };

//   const handlePayment = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return; // Stripe.js n'est pas encore chargé
//     }

//     const cardElement = elements.getElement(CardElement);

//     // Créer un paiement avec Stripe
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//     });

//     if (error) {
//       console.error(error);
//     } else {
//       console.log('PaymentMethod:', paymentMethod);
//       alert('Commande validée');
//       setIsModalOpen(false); // Fermer la modal après la validation
//     }
//   };

//   return (
//     <div>
//       <button className={styles.buyButton} onClick={handleValid} >
//         Passer commande
//       </button>
//       {
//         isModalOpen && (
//           <div className={styles.modal}>
//             <div className={styles.modalContent}>
//               <h2>Paiement </h2>
//               < form onSubmit={handlePayment} >
//                 <CardElement />
//                 < button type="submit" disabled={!stripe
//                 }>
//                   Régler
//                 </button>
//               </form>
//               < button onClick={() => setIsModalOpen(false)}> Fermer </button>
//             </div>
//           </div>
//         )}
//     </div>
//   );
// };

// export default ReglementModal;
