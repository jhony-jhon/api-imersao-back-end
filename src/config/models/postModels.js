import 'dotenv/config'; // importa o dotenv para carregar as variáveis de ambiente
import { ObjectId } from "mongodb"; // importa o ObjectId do MongoDB
import conectarAoBanco from "../dbConfig.js"; // importa a função de conexão com o banco de dados

let conexao;

async function inicializarConexao() {
    if (!conexao) {
        conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
    }
} // função para inicializar a conexão com o banco de dados

export async function getTodosOsPosts() {
    await inicializarConexao();
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
} // função para buscar todos os posts no banco de dados

export async function criarNovoPost(novoPost) {
    await inicializarConexao();
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
} // função para criar um novo post no banco de dados

export async function atualizarPostPorId(id, postAtualizado) {
    await inicializarConexao(); // inicializa a conexão com o banco de dados
    const db = conexao.db("imersao-instabytes"); // seleciona o banco de dados
    const colecao = db.collection("posts"); // seleciona a coleção de posts
    const objID = new ObjectId(id); // converte a string do ID para um objeto ObjectId
    return colecao.updateOne({ _id: objID }, { $set: postAtualizado }); // atualiza o post no banco de dados
} // função para atualizar um post no banco de dados