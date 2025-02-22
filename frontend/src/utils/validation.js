export const validateRegistration = (formData) => {
  const errors = [];

  // Validation du nom
  if (formData.name.length < 5) {
    errors.push("Le nom doit contenir au moins 5 caractères");
  }

  // Validation de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    errors.push("Veuillez entrer une adresse email valide");
  }

  // Validation du mot de passe
  if (formData.password.length < 6) {
    errors.push("Le mot de passe doit contenir au moins 6 caractères");
  }
  if (!/\d/.test(formData.password)) {
    errors.push("Le mot de passe doit contenir au moins un chiffre");
  }
  if (!/[a-z]/.test(formData.password)) {
    errors.push("Le mot de passe doit contenir au moins une lettre");
  }

  return errors;
};
