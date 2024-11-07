var express = require('express');
var router = express.Router();
require('../models/connection');

const Product = require('../models/products')



router.get('/', async (req, res) => {

  const { categorie } = req.query;
  let products;

  if (categorie) {
    products = await Product.find({ categorie: categorie }); // Filtrer par catégorie
  } else {
    products = await Product.find(); // Récupérer tous les produits
  }
  res.json(products); // Renvoyer les produits filtrés ou tous les produits
}
);




//Route pour rechercher dans plusieurs categories du produit
router.get('/search', async (req, res) => {
  const { motscles } = req.query;
  try {
    // Rechercher les produits par mot-clé
    const products = await Product.find({
      $or: [
        { motscles: { $regex: motscles, $options: 'i' } }, // Recherche dans motscles
        { name: { $regex: motscles, $options: 'i' } }, // Recherche dans le nom 
        { description: { $regex: motscles, $options: 'i' } }, // Recherche dans la description du produit
        { couleur: { $regex: motscles, $options: 'i' } },// Recherche par rapport a la couleur
        { matiere: { $regex: motscles, $options: 'i' } },// Recherche par rapport a la matiere
      ],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recherche des produits', error });
  }
});

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();  // Utilisez le modèle pour interagir avec la collection
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
});



module.exports = router;