var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/send-email', async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'mail',
    auth: {
      user: 'votre_email@gmail.com', // Remplacez par votre adresse Gmail
      pass: 'votre_mot_de_passe' // Remplacez par votre mot de passe d'application
    }
  });

  const mailOptions = {
    from: email,
    to: 'votre_email@gmail.com', // Remplacez par votre adresse de destination
    subject: `Message de ${firstName} ${lastName}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    res.status(500).json({ message: 'Échec de l\'envoi de l\'email' });
  }
});

module.exports = router;