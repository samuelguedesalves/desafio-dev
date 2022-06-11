import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  
  .content {
    width: 100%;
    height: 100%;
    max-width: 400px;

    margin: 0 auto;
    padding: 12px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      text-align: center;
      font-weight: 500;
      color: var(--dark);
      margin-bottom: 50px;
    }
  }
`;
