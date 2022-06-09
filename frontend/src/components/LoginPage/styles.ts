import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  
  .content {
    width: 100%;
    height: 100%;
    max-width: 720px;

    margin: 0 auto;
    padding: 12px;

    display: flex;
    justify-content: center;
    align-items: center;

    .form-container {
      h1 {
        text-align: center;
        font-weight: 500;
        color: var(--dark);
      }
  
      form {
        width: 100%;
  
        max-width: 400px;
        margin: 50px auto 0;
  
        input {
          width: 100%;
          height: 50px;
  
          padding: 0 12px;
          
          border-color: transparent;
          border-radius: 6px;
          
          font-size: 18px;
  
          & + input {
            margin-top: 20px;
          }

          :focus {
            outline: solid 3px var(--primary);
          }
        }
  
        button {
          height: 50px;
          width: 100%;

          margin-top: 30px;
          
          border-radius: 6px;
          border-color: transparent;
  
          background: var(--primary);
          color: var(--light);
          
          font-size: 18px;
          font-weight: 500;
  
          cursor: pointer;

          transition: all ease 0.2s;

          &:hover {
            background: var(--primary-dark);
          }

          
          &:focus {
            outline: solid 3px var(--primary-dark);
          }
        }

        .error-message {
          width: 100%;
          line-height: 80px;
          font-size: 18px;
          color: #FD4444;
        }
      }

      .sending-container {
        width: 100%;

        margin-top: 40px;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        row-gap: 20px;

        & span {
          color: var(--dark);
          font-size: 20px;
        }

        & svg {
          animation-name: loading;
          animation-duration: 4s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }

        @keyframes loading {
          from {
            transform: rotate(0deg);
          }
          
          to {
            transform: rotate(360deg);
          }
        }
      }
    }
  }
`;