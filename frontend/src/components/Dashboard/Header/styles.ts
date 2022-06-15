import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  height: 90px;

  max-width: 1080px;

  padding: 20px 40px;
  margin: 0 auto;
  margin-bottom: 20px;

  display: grid;
  grid-template-columns: 1fr 300px 200px;
  align-items: center;
  column-gap: 20px;

  & h1 {
    font-size: 24px;
    font-weight: 500;
  }

  & .user-info {
    display: grid;
    grid-template-columns: 40px 1fr 50px;
    align-items: center;
    font-size: 30px;

    & span {
      display: block;
      font-size: 18px;
    }

    & button {
      height: 50px;
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      background: var(--gray-250);
      color: var(--dark);
      border: solid 2px transparent;

      &:hover {
        background: var(--gray-250);
        border-color: var(--gray-300);
      }
    }
  }

  & button {
    width: 100%;
    height: 50px;
    
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