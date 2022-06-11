import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background: var(--red-50);
  height: 40px;
  border-radius: 6px;

  display: grid;
  grid-template-columns: 60px 1fr;

  color: var(--red-500);
  font-size: 18px;

  & svg {
    margin: auto auto;
  }

  & span {
    margin: auto 0;
  }
`;