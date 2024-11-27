import fs from "fs";
import { getTodosOsPosts, criarNovoPost, atualizarPostPorId } from "../models/postModels.js";
import gerarDescricaoComGemini from "../services/geminiServices.js";

export async function listarPosts(req, res) {
    try {
        const posts = await getTodosOsPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar os posts' });
    }
}

export async function criarPost(req, res) {
    try {
        const { titulo, conteudo, imagem } = req.body;

        // Validações adicionais podem ser adicionadas aqui

        const novoPost = { titulo, conteudo, imagem };
        const postCriado = await criarNovoPost(novoPost);
        res.status(201).json(postCriado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar o post' });
    }
}

export async function uploadImagem(req, res) {
    try {
        const { file } = req;
        const { postId } = req.body; // Receba o ID do post criado na requisição
        const imagemAtualizada = `uploads/${postId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json({ message: 'Imagem enviada com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao enviar a imagem' });
    }
}

export async function atualizarPost(req, res) {
    try {
        const { id } = req.params;
        const { titulo, conteudo, descricao, alt } = req.body;
        const urlImagem = `http://localhost:3000/uploads/${id}.png`; // URL da imagem no servidor

        
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricaoGemini = await gerarDescricaoComGemini(imgBuffer);

        const postAtualizado = {
            titulo,
            conteudo,
            imgUrl: urlImagem,
            descricao: descricaoGemini,
            alt
        };

        const resultado = await atualizarPostPorId(id, postAtualizado);

        if (resultado.modifiedCount === 0) {
            return res.status(404).json({ message: 'Post não encontrado' });
        }

        res.status(200).json({ message: 'Post atualizado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar o post' });
    }
}