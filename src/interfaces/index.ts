// arquivo para armazenar todas as interfaces da aplicação

export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
  }
  
export interface ProductsResponse {
    products: Product[];
}