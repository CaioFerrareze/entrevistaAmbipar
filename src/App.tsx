import React from "react";
import Search from "./components/Search";
import { AddItem } from "./components/AddItem";
import { UpdateItem } from "./components/UpdateItem";
import DeleteItem from "./components/DeleteItem";
import styled from "styled-components";


const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: #121212; 
  min-height: 100vh; 
`;
const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
`;
const PageTitle = styled.h1`
  font-size: 28px;
  color: #44d62c; 
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
`;
const SearchContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
`;

function App() {
  return (
    <Container>
      <PageTitle>Gestão de Produtos</PageTitle>
      <ActionButtons>
        <AddItem />
        <UpdateItem />
        <DeleteItem />
      </ActionButtons>
      <SearchContainer>
        <Search />
      </SearchContainer>
    </Container>
  );
}

export default App;
