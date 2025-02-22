import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// Générer un token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// @desc    Inscription utilisateur
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Vérifier si l'email existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Cet email est déjà utilisé",
      });
    }

    // Hash le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Inscription - Mot de passe original:", password);
    console.log("Inscription - Mot de passe hashé:", hashedPassword);

    const userId = new mongoose.Types.ObjectId().toString();

    const newUser = await User.create({
      _id: userId,
      name,
      email,
      password: hashedPassword,
      role: "patient",
    });

    // Vérifier que le hash est correct immédiatement après la création
    const verifyHash = await bcrypt.compare(password, newUser.password);
    console.log("Vérification du hash après création:", verifyHash);

    const token = generateToken(userId);

    res.status(201).json({
      _id: userId,
      name,
      email,
      role: "patient",
      token,
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Connexion utilisateur
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Aucun compte n'est associé à cet email",
      });
    }

    // Debug logs
    console.log("Tentative de connexion pour:", email);
    console.log("Mot de passe fourni:", password);
    console.log("Mot de passe hashé en DB:", user.password);

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Résultat de la comparaison:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        message: "Mot de passe incorrect",
      });
    }

    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({ message: error.message });
  }
};
