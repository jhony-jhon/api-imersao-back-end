let { API_URL } = process.env;

// Função para buscar os dados do endpoint
export default async function fetchImages() {
  try {
    const response = await fetch(process.env.API_URL); // Usando a URL importada
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

async function fetchData() {
  try {
    const response = await fetch('http://localhost:8003/api/endpoint');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
} // verifique se a URL está correta
