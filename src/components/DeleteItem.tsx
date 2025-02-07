import React, { useState } from "react";
import { deleteProduct } from "../services/productService";
import { Modal } from "./Modal"; 

const DeleteItem: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // criando os estados do componente
  const [productId, setProductId] = useState<number | "">(""); // inicialmente "" ou número
  const [message, setMessage] = useState("");

  const openModal = () => setIsModalOpen(true);// lida com abertura e fechamento do modal
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = async (e: React.FormEvent) => {// fnct que chama método delete após escolher qual o ID
    e.preventDefault();// evita a página recarregar após envio do formulário
    if (!productId) {
        setMessage("ID do produto é obrigatório!");
        return;
    }

    try {
        await deleteProduct(Number(productId)); // Converte para número
        setMessage(`Produto com ID ${productId} excluído com sucesso!`);
        setProductId(""); // Limpa o campo após a exclusão
        setTimeout(closeModal, 1000); // Fecha o modal após 1 segundo
    } catch (error) {
        setMessage("Erro ao excluir o produto.");
        console.error(error);
    }
  };

  return (
    <div>
      <button onClick={openModal}>Excluir Produto</button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Excluir Produto</h2>
        <form onSubmit={handleDelete}>
          <input
            type="number"
            placeholder="ID do Produto"
            value={productId}
            onChange={(e) => setProductId(e.target.value === "" ? "" : Number(e.target.value))} // converte para número ou "" se vazio
          />
          <button type="submit">Excluir</button>
        </form>
        {message && <p>{message}</p>}
      </Modal>
    </div>
  );
};

export default DeleteItem;
