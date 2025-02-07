import React, { useState } from "react";
import { getProducts } from "../services/productService";
import { Product } from "../interfaces/index" // importando tipagem

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
    <div>
        <h2>Campo de Pesquisa: </h2> 
        <input type="text" 
            value={searchTerm} 
            onChange={(e) => {
                setSearchTerm(e.target.value);  // atualiza o termo de busca conforme o usuário digita
                filterProducts(products);  // aplica o filtro enquanto o usuário digita
            }}  
            placeholder="Buscar por nome, descrição, preço ou categoria..."
        /> 
        <button onClick={handleSearch}>Pesquisar</button>
        <h3>Resultado: </h3>
        <ul>
            {filteredProducts.map((product) => (// percorre a lista de produtos filtrados e renderiza cada item na tela
                <li style={{marginBottom:'5px'}} key={product.id}>
                    <strong>ID: {product.id}</strong> <br /> 
                    Produto: {product.title} - ${product.price} <br />
                    Categoria: {product.category} <br/>
                    Descrição: {product.description}<hr />
                </li>
                
            ))}
        </ul>
    </div>
    );
}

export default Search;
