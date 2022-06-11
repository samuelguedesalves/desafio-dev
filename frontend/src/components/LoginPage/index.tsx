import React from "react";

import { FormLoginPage } from "../FormLoginPage";

import { Container } from "./styles";

export const LoginPage: React.FC = () => {
  return (
    <Container>
      <div className="content">
        <h1>Login</h1>

        <FormLoginPage />
      </div>
    </Container>
  );
};
