import styled from "styled-components";
import { Link as ReactDomLink } from "react-router-dom";


export const Form = styled.form`
  width: 100%;
  max-width: 400px;

  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  height: 50px;

  padding: 0 12px;
  
  border-color: transparent;
  border-radius: 6px;
  
  font-size: 18px;

  &:focus {
    outline: solid 3px var(--primary);
  }
  
  & + & {
    margin-top: 20px;
  }
`;

export const Button = styled.button`
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
`;

export const SendingSpinerContainer = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 20px;

  background: var(--transparent-background);

  & span {
    color: var(--dark);
    font-size: 24px;
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
`;

export const Link = styled(ReactDomLink)`
  display: block;

  margin-top: 20px;
  
  font-size: 18px;
  color: var(--primary);
`;