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