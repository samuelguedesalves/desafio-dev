import styled from "styled-components";
import { Link as ReactDomLink } from "react-router-dom";

export const Container = styled.div`
  position: relative;
`;

export const Form = styled.form`
  width: 100%;

  & input {
    display: block;
    width: 100%;
    height: 50px;
    padding: 0 12px;
    font-size: 18px;
    border-color: transparent;
    border-radius: 6px;

    & + input {
      margin-top: 20px;
    }
  }

  & button {
    width: 100%;
    height: 50px;

    margin-top: 20px;

    background-color: var(--primary);
    color: var(--light);
    
    border-color: transparent;

    font-size: 18px;

    cursor: pointer;
    border-radius: 6px;
  }
`;

export const Link = styled(ReactDomLink)`
  display: block;

  margin-top: 20px;
  
  font-size: 18px;
  color: var(--primary);
`;

export const SpinerContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  align-items: center;
  justify-content: center;
  background-color: var(--transparent-background);
  font-size: 18px;

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