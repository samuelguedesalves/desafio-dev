import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  .content {
    width: 100%;
    max-width: 1080px;
    margin: 0 auto;

    header {
      width: 100%;
      height: 90px;
      padding: 20px 12px;

      display: flex;
      justify-content: space-between;

      p {
        font-weight: 500;
        font-size: 24px;
      }

      .right-container {
        display: flex;
        column-gap: 20px;

        & .user-info {
          span {
            display: block;
            font-size: 18px;
          }
        }
        
        button {
          height: 40px;
          padding: 0 12px;
  
          font-size: 18px;
          color: var(--light);
          background: var(--primary);
          border-radius: 6px;
          border-color: transparent;
          
          cursor: pointer;
  
          transition: all ease 0.2s;
  
          &:hover {
            background: var(--primary-dark);
          }
  
          
          &:focus {
            outline: solid 3px var(--primary-dark);
          }
        }
      }

    }
  }
`;