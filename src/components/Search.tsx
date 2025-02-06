import React, { useState } from "react";
import { getProducts } from "../services/productService";

const Search: React.FC = () => {
    const [products, setProducts] = useState([]); // Lida com o estado da lista de produtos

    const handleSearch = () => { // Ao clicar no botão 'Pesquisar', faz a chamada e atualiza estado da lista de produtos
        getProducts().then((data) => setProducts(data.products));
    }

    return(
    <div >
        <h2>Campo de Pesquisa: </h2> <input type="text"/> <button onClick={handleSearch}>Pesquisar</button>
        <h3>Resultado: </h3>
        <ul>
            {products.map((product) => (
                <li key={product.id}>{product.title} - ${product.price}</li>
            ))}
        </ul>

    </div>
)
        
    
}

export default Search