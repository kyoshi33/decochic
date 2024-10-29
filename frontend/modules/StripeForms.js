import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { clearCart } from '../reducers/cart'
import { useDispatch } from 'react-redux';



const StripeForms = ({ options, cart, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [validPaiement, setValidPaiement] = useState('Votre commande est validée')
  const user = useSelector((state) => state.user.value);
  const router = useRouter();
  const dispatch = useDispatch();


  // Lorsque le composant se monte, demander au backend de créer un PaymentIntent
  useEffect(() => {
    if (totalPrice) {
      async function createPaymentIntent() {
        const response = await fetch('http://localhost:3000/pay/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ totalAmount: totalPrice * 100 }),
        });
        const data = await response.json();
        // Log pour vérifier la réponse reçue du backend
        console.log("Réponse du backend pour PaymentIntent:", data);

        setClientSecret(data.clientSecret);
      }
      createPaymentIntent();
    }
  }, [totalPrice]);

  const handlePayment = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements || !clientSecret) {
      console.error("Stripe ou éléments non disponibles, ou clientSecret manquant.");
      setErrorMessage("Problème d'initialisation de Stripe. Veuillez réessayer.");
      setIsProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setErrorMessage(error.message);
        console.error("Erreur lors de la confirmation du paiement:", error.message);
        setIsProcessing(false);
        return;
      }

      // Si le paiement est réussi, envoyer les détails de la commande au backend
      const orderDetails = {
        email: user.email,
        token: user.token,
        cart,
        paymentIntentId: paymentIntent.id,
        totalAmount: paymentIntent.amount,
      };

      const response = await fetch('http://localhost:3000/users/commandes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetails),
      });

      const result = await response.json();
      console.log("le resultat du result est :", result)
      if (result.result) {
        dispatch(clearCart());
        setValidPaiement();
        router.push({ pathname: '/Profil' })
      } else {
        setErrorMessage('Erreur lors de la création de la commande');
      }

      setIsProcessing(false);
    } catch (err) {
      console.error("Erreur lors de la confirmation du paiement:", err);
      setErrorMessage("Erreur lors de la confirmation du paiement.");
      setIsProcessing(false);
    }
  };


  return (

    <form onSubmit={handlePayment}>
      <CardElement options={options} />
      <button type="submit">Payer</button>
    </form>

  );

};

export default StripeForms;
