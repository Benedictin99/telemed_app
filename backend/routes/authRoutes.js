import express from "express";
import {
  register,
  login,
  generateToken,
} from "../controllers/authController.js";
import {
  validateRegister,
  validateLogin,
  handleValidationErrors,
} from "../middleware/validateRequest.js";
import passport from "passport";

const router = express.Router();

router.post("/register", validateRegister, handleValidationErrors, register);
router.post("/login", validateLogin, handleValidationErrors, login);

// Routes Google Auth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    try {
      const token = generateToken(req.user._id);
      res.redirect(
        `http://localhost:5173/auth/success?token=${token}&user=${JSON.stringify(
          req.user
        )}`
      );
    } catch (error) {
      res.redirect("http://localhost:5173/login");
    }
  }
);

export default router;
