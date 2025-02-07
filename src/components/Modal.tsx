import React from "react";
import styled from "styled-components";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`
const ModalContent= styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    min-width: 300px;
    position: relative;
`
const ModalButton= styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    border-radius: 5px;
    background: #ff7c7c;
    color: white;
    padding: 5px 10px;
    cursor: pointer;
    &:hover{
        background: #ff0000;
    }
`


export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <ModalOverlay>
            <ModalContent>
                <ModalButton className="modal-close" onClick={onClose}>X</ModalButton>
                {children}
            </ModalContent>
        </ModalOverlay>
    );
};
