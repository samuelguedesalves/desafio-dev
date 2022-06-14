import type { User } from "../../../types/User";

import React from "react";

import { HeaderContainer } from "./styles";

type HeaderProps = {
  user: User;
  openModal: () => void;
};

export const Header: React.FC<HeaderProps> = ({ openModal, user }) => {
  return (
    <HeaderContainer>
      <h1>CNAB Parser</h1>

      <div className="user-info">
        <span>{user.name}</span>
        <span>{user.email}</span>
      </div>

      <button onClick={() => openModal()}>Enviar arquivo CNAB</button>
    </HeaderContainer>
  );
};
