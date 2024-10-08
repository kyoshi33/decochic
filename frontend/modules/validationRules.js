const validationRules = {
  firstName: {
    required: "First Name is required",
    minLength: { value: 3, message: "Le prenom doit contenir au moins 3 caracteres " },
    maxLength: { value: 50, message: "Maximum 50 carateres" },
  },
  name: {
    required: "name is required",
    minLength: { value: 3, message: "Le nom doit contenir au moins 3 caracters" },
    maxLength: { value: 50, message: "Maximum 50 carateres" },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
      message: "Format e-mail invalide",
    },
  },
  motDePasse: {
    required: "Champs obligatoires",
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9\W])(?=^(?!.*(.)\1{2}).{8,}).*$/,
      message: "Format mot de passe invalide",
    },
  },
  confirmationMotDePasse: {
    required: "Champs obligatoires",
    validate: (value) =>
      value === motDePasse || "Les mots de passe ne sont pas identiques",
  },
  codePostal: {
    required: "Champs obligatoires",
  },
  adresse: {
    required: "Champs obligatoires",
  },
  ville: {
    required: "Champs obligatoires",
  }

}

module.exports = { validationRules }