import { body, validationResult } from "express-validator";

export const validateRegister = [
  // Validation du nom
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Le nom est requis")
    .isLength({ min: 5, max: 50 })
    .withMessage("Le nom doit être entre 5 à 50 caractères")
    .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/)
    .withMessage("Le nom ne doit contenir que des lettres, espaces et tirets"),

  // Validation de l'email
  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est requis")
    .isEmail()
    .withMessage("Veuillez fournir un email valide")
    .normalizeEmail(),

  // Validation du mot de passe
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Le mot de passe est requis")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères")
    .matches(/^(?=.*[a-z])(?=.*\d).*$/)
    .withMessage(
      "Le mot de passe doit contenir au moins une lettre et un chiffre"
    ),
];

export const validateLogin = [
  // Validation de l'email
  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est requis")
    .isEmail()
    .withMessage("Veuillez fournir un email valide")
    .normalizeEmail(),

  // Validation du mot de passe
  body("password").trim().notEmpty().withMessage("Le mot de passe est requis"),
];

// Middleware pour vérifier les erreurs de validation
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Erreur de validation",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};
