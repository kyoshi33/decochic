var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const { checkBody } = require('../modules/checkbody')

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Requête pour récupérer les produits
    res.json(users); // Renvoi du résultat en format JSON
  } catch (err) {
    res.status(500).send("Erreur lors de la récupération des produits");
  }
});

// Créer un nouvel utilisateur.
router.post('/signup', (req, res) => {
  //Vérifier que les champs sont tous fournis
  if (!checkBody(req.body, ['civilite', 'firstName', 'name', 'password', 'email', 'adresse', 'codePostal', 'ville'])) {
    res.json({ result: false, error: 'Champs manquants ou vides' });
    return;
  }
  // Vérifier que l'utilisateur n'existe pas déjà en base de données
  User.findOne({ firstName: req.body.firstName, name: req.body.name, email: req.body.email }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);
      // Créer le nouvel utilisateur
      const newUser = new User({
        civilite: req.body.civilite,
        firstName: req.body.firstName,
        name: req.body.name,
        email: req.body.email,
        password: hash,
        token: uid2(32),
        adresse: req.body.adresse,
        codePostal: req.body.codePostal,
        ville: req.body.ville,
      });
      newUser.save().then(newDoc => {
        res.json({ result: true, token: newDoc.token, civilite: req.body.civilite, firstName: req.body.firstName, name: req.body.name, email: req.body.email });
      });
    } else {
      // L'utilisateur existe déjà en base de données
      res.json({ result: false, error: 'Utilisateur déjà existant' });
    }
  });
});

// Se connecter
router.post('/signin', (req, res) => {
  // Vérifier que les champs sont tous fournis
  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'Champs manquants ou vides' });
    return;
  }
  User.findOne({ email: req.body.email })
    .then(data => {
      if (data && bcrypt.compareSync(req.body.password, data.password)) {
        res.json({ result: true, token: data.token, firstName: data.firstName, name: data.name, email: data.email });
      } else {
        res.json({ result: false, error: 'Champs manquants ou vides' })
      }
    })
});






module.exports = router;
