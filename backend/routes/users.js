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
        adresses: [{
          adresse: req.body.adresse,
          codePostal: req.body.codePostal,
          ville: req.body.ville,
        }]
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
        res.json({ result: true, token: data.token, firstName: data.firstName, name: data.name, email: data.email, liked: data.liked });
      } else {
        res.json({ result: false, error: 'Champs manquants ou vides' })
      }
    })
});


//Recuperer les likes de l'utilisateur
router.post("/like", async (req, res) => {
  // Vérifier que les champs sont tous fournis
  if (!checkBody(req.body, ['token', 'email', 'id'])) {
    return;
  }
  // Authentification de l'utilisateur
  const foundUser = await User.findOne({ email: req.body.email, token: req.body.token })
  if (!foundUser) { return res.json({ result: false, error: 'Access denied' }) };
  // Ajouter ou retirer un like
  if (foundUser.liked.includes(req.body.id)) {
    // Retirer le like si déjà présent
    await User.updateOne({ email: req.body.email }, { $pull: { liked: req.body.id } });
  } else {
    // Ajouter le like si pas encore présent
    await User.updateOne({ email: req.body.email }, { $push: { liked: req.body.id } });
  }
  const updatedUser = await User.findOne({ email: req.body.email, token: req.body.token })
  res.json({ result: true, liked: updatedUser.liked })
})


// //Recuperer les likes sur les produits
// router.get("/profile/likes", async (req, res) => {
//   const foundUser = await User.findOne({ email: req.query.email, token: req.query.token }).populate('liked');
//   if (!foundUser) {
//     return res.json({ result: false, error: 'Access denied' });
//   }

//   res.json({ result: true, likedProducts: foundUser.liked });
// });



router.get("/likesProducts", async (req, res) => {
  // Récupère l'utilisateur à partir de l'email et du token
  const foundUser = await User.findOne({ email: req.query.email, token: req.query.token }).populate('liked');
  // Si l'utilisateur n'est pas trouvé, retourne une erreur
  if (!foundUser) {
    console.log('Accès refusé - Utilisateur introuvable');  // Log en cas d'erreur
    return res.json({ result: false, error: 'Access denied' });
  }
  // Affiche dans la console les produits likés avant de les renvoyer
  console.log('Produits likés renvoyés:', foundUser.liked);  // Log des produits likés
  // Renvoie les produits likés au frontend
  res.json({ result: true, likedProducts: foundUser.liked });
});


router.get("/commandes", async (req, res) => {
  // Récupère l'utilisateur à partir de l'email et du token
  const foundUser = await User.findOne({ email: req.query.email, token: req.query.token }).populate('commandes');

  if (!foundUser) {
    console.log('Accès refusé - Utilisateur introuvable');  // Log en cas d'erreur
    return res.json({ result: false, error: 'Access denied' });
  }
  // Affiche dans la console les produits likés avant de les renvoyer
  console.log('Produits achetes renvoyés:', foundUser.commandes);  // Log des produits likés
  // Renvoie les produits likés au frontend
  res.json({ result: true, commandesList: foundUser.commandes });
});




module.exports = router;
