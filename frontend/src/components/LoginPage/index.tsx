import React from "react";
import { Route, Routes } from "react-router-dom";

import { FormLoginPage } from "../FormLoginPage";
import { FormSignUp } from "../FormSignUp";

import { Container } from "./styles";

export const LoginPage: React.FC = () => {
  return (
    <Container>
      <div className="content">
        <Routes>
          <Route path="/" element={<FormLoginPage />} />
          <Route path="/signup" element={<FormSignUp />} />
        </Routes>
      </div>
    </Container>
  );
};
