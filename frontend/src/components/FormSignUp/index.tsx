import React, { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Container, Form, Link, SpinerContainer } from "./styles";

type SignUpMessageErrors = {
  email?: string[];
  password?: string[];
};

export const FormSignUp = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isSending, setIsSending] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<SignUpMessageErrors | null>(
    null
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSending(true);

    const result = await signUp(name, email, password);

    if (result.isLogged) {
      setErrorMessage(null);
      setIsSending(false);
      redirectToDashboard();
    } else {
      setErrorMessage(result.message as SignUpMessageErrors);
      setIsSending(false);
    }
  }

  function redirectToDashboard() {
    navigate("/dashboard");
  }

  return (
    <Container>
      <h1>Sign Up</h1>

      <Form onSubmit={(event) => handleSubmit(event)}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Criar conta</button>
      </Form>

      {errorMessage &&
        (errorMessage.password ? (
          <span>Password:{errorMessage.password}</span>
        ) : (
          errorMessage.email && <span>Email: {errorMessage.email}</span>
        ))}

      <Link to={"/"}>Fazer login</Link>

      {isSending && (
        <SpinerContainer>
          <FiRefreshCw size={30} />
          Enviando dados...
        </SpinerContainer>
      )}
    </Container>
  );
};
