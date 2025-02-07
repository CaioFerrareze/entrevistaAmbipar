const BASE_URL = "https://dummyjson.com/products"; // url básica para fazer as chamadas

// a getProducts faz uma requisição get e aguarda a resposta retornando os produtos em formato JSON
export const getProducts = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

// a getProductById recebe um id como parâmetreo assim identificando qual produto queremos que retorne
export const getProductById = async (id: number) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  return response.json();
};

// apesar de eu ter criado o método, DummyJson não salva realmente os dados enviados. O POST retorna um objeto simulado, mas esse dado não é criado no backend
export const createProduct = async (product: { title: string; price: number; category: string }) => {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return response.json();
};
