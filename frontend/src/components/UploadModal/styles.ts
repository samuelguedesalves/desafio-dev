import styled from 'styled-components';

type InputFileLabelProps = {
  selected?: boolean
}

export const Title = styled.h2`
  font-weight: 500;
  color: var(--dark);
`;

export const Form = styled.form`
  width: 100%;
  position: relative;
`;

export const InputFileLabel = styled.label<InputFileLabelProps>`
  width: 100%;
  height: 200px;

  margin-top: 30px;

  background: ${ props => props.selected? '#D6B6D7' : '#ddd' };
  color: var(--dark);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;

  font-size: 20px;

  border-radius: 12px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  padding: 0 12px;
  margin-top: 30px;

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
`;

export const SendingContainer = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 20px;

  font-size: 20px;

  background: var(--transparent-background);

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

export const ErrorRequestContainer = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 20px;

  font-size: 20px;
  background: var(--light);

  button.try-again {
    width: 100%;
    height: 50px;
    
    font-size: 18px;

    border-radius: 6px;
    border-color: transparent;
    background: var(--primary);
    color: var(--light);

    cursor: pointer;

    transition: ease 0.2s;

    &:hover {
      background: var(--primary-dark);
    }
  }

  button.cancel {
    width: 100%;
    height: 50px;

    background: var(--gray-200);
    color: var(--dark);
    
    border: solid 2px var(--gray-300);
    border-radius: 6px;
    font-size: 20px;
    
    cursor: pointer;

    transition: ease 0.6s;

    &:hover {
      background: var(--gray-250);
    }
  }
`;