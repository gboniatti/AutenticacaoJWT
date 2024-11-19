const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const login = (request, response) => {
  const { username, password } = request.body;

  if (username === "professor.lucas" && password === "1234") {
    const payload = {
      sub: username,
      name: "Lucas José de Souza",
      iat: Math.floor(Date.now() / 1000),
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1d" });
    return response.json({ message: "Login bem-sucedido!", token });
  }

  response.status(401).json({ message: "Credenciais inválidas" });
};

const protectedContent = (request, response) => {
  const token = request.headers["authorization"];

  if (!token) {
    return response.status(403).json({ message: "Token não fornecido" });
  }

  try {
    const bearerToken = token.split(" ")[1]; // Extrai o token do formato "Bearer <token>"
    const decoded = jwt.verify(bearerToken, secretKey);

    // Verificando qual rota foi chamada e executando a ação apropriada
    const route = request.url;

    if (route === "/protected") {
      return response.json({ message: "Conteúdo protegido acessado!", user: decoded });
    }

    if (route === "/user/profile") {
      return response.json({
        message: "Perfil do usuário",
        profile: {
          username: decoded.sub,
          name: decoded.name,
        },
      });
    }

    if (route === "/user/logout") {
      return response.json({
        message: "Logout bem-sucedido!",
      });
    }

  } catch (error) {
    return response.status(403).json({ message: "Token inválido ou expirado" });
  }
};


module.exports = { login, protectedContent};
