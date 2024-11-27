import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./src/config/routes/postRoutes.js"; // ajuste o caminho conforme necessário

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar o middleware para servir arquivos estáticos
console.log(app.use('/uploads', express.static(path.join(__dirname, 'uploads'))));

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});