import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, criarPost, uploadImagem, atualizarPost } from "../controllers/postsController.js";

const corsOption = {
    origin: "http://localhost:8003",
    optionsSuccessStatus: 200
} // Configuração do CORS para aceitar requisições da porta 8003

const router = express.Router(); // Cria um objeto de roteamento do Express
const upload = multer({ dest: "./uploads" }); // Configura o Multer para salvar arquivos na pasta uploads

router.use(express.json()); // Middleware para o Express parsear JSON
router.use(cors(corsOption)); // Middleware para o Express habilitar o CORS

router.get("/posts", listarPosts); // Rota para listar todos os posts
router.post("/posts", criarPost); // Rota para criar um post
router.post("/upload", upload.single("imagem"), uploadImagem); // Rota para fazer upload de uma imagem
router.put("/posts/:id", atualizarPost); // Rota para atualizar um post

export default router;