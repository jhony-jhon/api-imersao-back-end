import { MongoClient } from "mongodb";

async function conectarAoBanco(uri) {
    const cliente = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await cliente.connect();
    return cliente;
}

export default conectarAoBanco;