import React, { useState } from "react";
import styled from "styled-components";
import { updateProduct } from "../services/productService";
import { Modal } from "./Modal";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const UpdateItem: React.FC = () => {
    // criando os estados do componente
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");

    const openModal = () => setIsModalOpen(true); // lida com abertura e fechamento do modal
    const closeModal = () => setIsModalOpen(false);

    const handleUpdate = async (e: React.FormEvent) => { // fnct que chama método patch após usuário preencher campos
        e.preventDefault(); // evita a página recarregar após envio do formulário
        if (!id || !title || !price || !category) {
            setMessage("Todos os campos são obrigatórios!");
            return;
        }
        try {
            const updatedData = { title, price: parseFloat(price), category };
            const response = await updateProduct(parseInt(id), updatedData);
            setMessage(`Produto "${response.title}" atualizado com sucesso!`);
            setTitle(""); // limpa os campos após o sucesso
            setPrice("");
            setId("");
            setCategory("");
            setTimeout(closeModal, 1000);
        } catch (error) {
            setMessage("Erro ao atualizar o produto.");
            console.error(error);
        }   
    };

    return (
        <div>
            <button onClick={openModal}>Atualizar Produto</button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2>Atualizar Produto</h2>
                <Form onSubmit={handleUpdate}>
                    <input
                        type="number"
                        placeholder="ID do Produto"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Novo Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Novo Preço"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Nova Categoria"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <button type="submit">Atualizar</button>
                </Form>
                {message && <p>{message}</p>}
            </Modal>
        </div>
    );
};
