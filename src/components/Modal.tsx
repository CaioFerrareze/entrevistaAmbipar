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
    z-index: 1000; 
    transition: opacity 0.3s ease;
    opacity: ${(props: { isOpen: boolean }) => (props.isOpen ? 1 : 0)};
    visibility: ${(props: { isOpen: boolean }) => (props.isOpen ? "visible" : "hidden")};
`;

const ModalContent = styled.div`
    background: #2c2c2c;
    padding: 30px;
    border-radius: 12px;
    min-width: 320px;
    max-width: 500px;
    position: relative;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease-in-out;
    transform: ${(props: { isOpen: boolean }) => props.isOpen ? "scale(1)" : "scale(0.7)"};
`;

const ModalButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    border-radius: 5px;
    background: #abfd9e;
    color: #858585;
    padding: 8px 15px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
        background: #44d62c;
        color: #fff;
    }
`;

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    return (
        <ModalOverlay isOpen={isOpen} onClick={onClose}>
            <ModalContent isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
                <ModalButton onClick={onClose}>X</ModalButton>
                {children}
            </ModalContent>
        </ModalOverlay>
    );
};
