require('dotenv').config(); // Charger les variables d'environnement

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Utilisation de la clé Stripe
var router = express.Router();

// test clé Stripe
console.log("Clé Stripe utilisée :", process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', async (req, res) => {
  const { totalAmount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: 'Erreur lors de la création du PaymentIntent' });
  }
});

module.exports = router;
