import type { User } from "../../../types/User";

import React from "react";
import { FiLogOut, FiUser } from "react-icons/fi";

import { useAuth } from "../../../hooks/useAuth";

import { HeaderContainer } from "./styles";

type HeaderProps = {
  user: User;
  openModal: () => void;
};

export const Header: React.FC<HeaderProps> = ({ openModal, user }) => {
  const { logout } = useAuth();

  return (
    <HeaderContainer>
      <h1>CNAB Parser</h1>

      <div className="user-info">
        <FiUser />

        <div>
          <span>{user.name}</span>
          <span>{user.email}</span>
        </div>

        <button onClick={() => logout()}>
          <FiLogOut />
        </button>
      </div>

      <button onClick={() => openModal()}>Enviar arquivo CNAB</button>
    </HeaderContainer>
  );
};
