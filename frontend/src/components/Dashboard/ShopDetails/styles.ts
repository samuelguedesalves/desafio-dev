import styled from 'styled-components';

export const Section = styled.section`
  width: 100%;

  & nav {
    margin-bottom: 20px ;
    & button {
      font-size: 20px;
      border-color: transparent;
      background-color: transparent;
      column-gap: 12px;
      height: 50px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }

  & header {
    display: flex;
    justify-content: space-between;

    margin-bottom: 20px;

    & h3 {
      font-size: 24px;
    }

    & p {
      font-size: 24px;
    }
  }

  & main {
    padding: 0;
  }
`;

export const Article = styled.article`
  width: 100%;
  
  display: grid;
  grid-template-columns: 50px 1fr 2fr;
  
  margin-bottom: 20px;
  padding: 12px;

  background: var(--gray-200);

  border-radius: 6px;

  & .nature {
   display: flex;
   justify-content: center;
   align-items: center;

   font-size: 20px;
  }

  & .amount {
    display: flex;
    align-items: center;
    
    font-size: 20px;
  }

  & .details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: 20px;
  }
`;

export const Span = styled.span`
  font-size: 20px;
  font-weight: 500;
  display: block;
  text-align: center;
`;