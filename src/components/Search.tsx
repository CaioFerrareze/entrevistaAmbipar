import React, { useState } from "react";
import { getProducts } from "../services/productService";
import { Product } from "../interfaces/index" // importando tipagem
import styled from "styled-components";

const SearchContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  color: #fff; 
`;


const SearchInput = styled.input`
  padding: 12px;
  border: 2px solid #444;
  border-radius: 8px;
  background-color: #222;
  color: white;
  width: 100%;
  margin-bottom: 15px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #44d62c; 
  }
`;

const SearchButton = styled.button`
  background-color: #44d62c; 
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  width: 100%;
  max-width: 200px;
  margin: 10px 0;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #369d22; // Tom de verde mais escuro ao passar o mouse
  }
`;

const SearchTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 15px;
  color: #44d62c; // Verde
`;

const ProductList = styled.ul`
  list-style-type: none;
  padding: 0;
  color: #fff; // Texto branco para contraste
`;

const ProductItem = styled.li`
  margin-bottom: 15px;
  padding: 10px;
  background-color: #333;
  border-radius: 8px;
`;

const ProductDetails = styled.div`
  margin-bottom: 10px;
`;

const Search: React.FC = () => {
    // criando os estados do componente
    const [products, setProducts] = useState<Product[]>([]);  
    const [searchTerm, setSearchTerm] = useState<string>("");  
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);  
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false); // esse estado serve para não renderizar a lista antes da pesquisa

    
    const handleSearch = () => {
        if (!isDataLoaded) {// se os dados não foram carregados busca na API e atualiza os estados, Método Get
            getProducts().then((data) => {
                setProducts(data.products); // armazena os produtos
                setFilteredProducts(data.products); 
                setIsDataLoaded(true); // marca que os dados foram carregados
                filterProducts(data.products); // aplica o filtro de pesquisa
            });
        } else {
            filterProducts(products);// caso os dados já tenham sido carregados, aplica o filtro
        }
    };

    const filterProducts = (data: Product[]) => { // filtra os produtos 
        const filtered = data.filter((product) => 
            product.id.toString().includes(searchTerm) || // ID
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) || // nome
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||// descrição
            product.category.toLowerCase().includes(searchTerm.toLowerCase()) || // categoria
            product.price.toString().includes(searchTerm) // preço
        );
        setFilteredProducts(filtered); // atualiza a lista de produtos filtrados
    };

    return(
        <SearchContainer>
        <SearchTitle>Campo de Pesquisa</SearchTitle>
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value); // atualiza o termo de busca conforme o usuário digita
            filterProducts(products);  // aplica o filtro enquanto o usuário digita
          }}
          placeholder="Buscar por ID, nome, descrição, preço ou categoria..."
        />
        <SearchButton onClick={handleSearch}>Pesquisar</SearchButton>
        <h3>Resultado:</h3>
        <ProductList>
          {filteredProducts.map((product) => ( // percorre a lista de produtos filtrados e renderiza cada item na tela
            <ProductItem key={product.id}>
              <ProductDetails>
                <strong>ID: {product.id}</strong> <br />
                Produto: {product.title} - ${product.price} <br />
                Categoria: {product.category} <br />
                Descrição: {product.description}
              </ProductDetails>
              <hr />
            </ProductItem>
          ))}
        </ProductList>
      </SearchContainer>
    );
  };

export default Search;
