import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 80px;
  
  display: grid;
  grid-template-columns: 1fr 1fr 200px;
  align-items: center;
  
  padding: 0 20px;

  background: var(--gray-200);

  border-radius: 12px;
  
  & span {
    display: block;
    
    font-size: 20px;

    color: var(--dark);
  }
  
  & button {
    height: 50px;

    background: var(--gray-250);
    
    font-size: 20px;
    color: var(--dark);
    
    border: solid 2px transparent;
    border-radius: 6px;
    
    cursor: pointer;

    transition: ease 0.2s;

    &:hover {
      border: solid 2px var(--gray-300);
    }
  }

  & + & {
    margin-top: 20px;
  }
`;