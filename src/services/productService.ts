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

// apesar de eu ter criado o método o DummyJson não salva realmente os dados enviados. O POST retorna um objeto simulado, mas esse dado não é criado no backend
export const createProduct = async (product: { title: string; price: number; category: string }) => {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return response.json();
};

// do mesmo modo que o método acima o DummyJson aceita requisições PATCH, mas as alterações não são salvas permanentemente porque é uma API de teste
export const updateProduct = async (id: number, updatedData: object) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return response.json();

  // trocando o return acima pelo abaixo podemos ver as alterações sendo feitos no console

  // const data = await response.json();
  // console.log("Resposta da API:", data); 
  // return data;
};

// do mesmo modo que os outros métodos essa chamada não vai deletar nada, porém a lógica se aplica a uma API real
export const deleteProduct = async (id: number) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE", 
  });
  return response.json(); 
};