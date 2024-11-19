const express = require("express");
const { login, protectedContent } = require("./controllers/authController");

const router = express.Router();

// Rota pública
router.get("/", (request, response) => {
  response.json({ message: "Bem-vindo à API pública!" });
});

// Rota de login
router.post("/login", login);

// Rota protegida
router.get("/protected", protectedContent);
router.get("/user/profile", protectedContent);
router.post("/user/logout", protectedContent);  

module.exports = router;
