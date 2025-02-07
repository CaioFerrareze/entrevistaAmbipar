import React, { useState } from "react";
import styled from "styled-components";
import { createProduct } from "../services/productService";
import { Modal } from "./Modal";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const AddItem: React.FC = () => {
    // criando os estados do componente
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");

    const openModal = () => setIsModalOpen(true); // lida com abertura e fechamento do modal
    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = async (e: React.FormEvent) => { // fnct que chama método post após usuário preencher campos
        e.preventDefault();

        if (!title || !price || !category) {
            setMessage("Todos os campos são obrigatórios!");
            return;
        }

        try {
            const newProduct = { title, price: parseFloat(price), category };
            const response = await createProduct(newProduct);
            setMessage(`Produto "${response.title}" adicionado com sucesso!`);
            setTitle(""); // limpa os campos após o sucesso
            setPrice("");
            setCategory("");
            setTimeout(closeModal, 1000);
        } catch (error) {
            setMessage("Erro ao adicionar o produto.");
            console.error(error);
            }
    };

    return (
        <div>
        <button onClick={openModal}>Adicionar Item</button>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <h2>Adicionar Produto</h2>
            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Preço"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Categoria"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <button type="submit">Adicionar</button>
            </Form>
            {message && <p>{message}</p>}
        </Modal>
        </div>
    );
};
