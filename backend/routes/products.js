var express = require('express');
var router = express.Router();
require('../models/connection');

const Product = require('../models/products')


// Recuperation des produits en fonction de la liste choisi dans la requete
router.get('/', async (req, res) => {
  try {
    const { categorie } = req.query;
    let products;

    if (categorie) {
      products = await Product.find({ categorie: categorie }); // Filtrer par catégorie
    } else {
      products = await Product.find(); // Récupérer tous les produits
    }
    res.json(products); // Renvoyer les produits filtrés ou tous les produits
  } catch (err) {
    res.status(500).send("Erreur lors de la récupération des produits");
  }
});

router.get('/search', async (req, res) => {
  const { motscles } = req.query;

  try {
    // Requête MongoDB pour rechercher les produits par mot-clé
    const products = await Product.find({
      $or: [
        { motscles: { $regex: motscles, $options: 'i' } }, // Recherche dans la description du produit
        { name: { $regex: motscles, $options: 'i' } }, // Recherche dans le nom du produit
        { description: { $regex: motscles, $options: 'i' } }, // Recherche dans la description du produit
        { couleur: { $regex: motscles, $options: 'i' } },
        { matiere: { $regex: motscles, $options: 'i' } },
      ],
    });

    res.json(products); // Retourner les produits au frontend
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recherche des produits', error });
  }
});

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();  // Utilisez le modèle pour interagir avec la collection
    res.json(products);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
});



module.exports = router;