import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  height: 90px;

  max-width: 1080px;

  padding: 20px 40px;
  margin: 0 auto;
  margin-bottom: 20px;

  display: grid;
  grid-template-columns: 1fr 200px 200px;
  align-items: center;

  & h1 {
    font-size: 24px;
    font-weight: 500;
  }

  & .user-info span {
    display: block;
    font-size: 18px;
  }

  & button {
    width: 100%;
    height: 40px;
    
    color: var(--light);
    background: var(--primary);
    
    border-radius: 6px;
    border-color: transparent;
    
    padding: 0 12px;
    
    font-size: 18px;
    
    cursor: pointer;

    transition: all ease 0.2s;

    &:hover {
      background: var(--primary-dark);
    }

    
    &:focus {
      outline: solid 3px var(--primary-dark);
    }
  }
`;