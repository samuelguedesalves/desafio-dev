import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

import { useAuth } from "../../hooks/useAuth";
import { ErrorAlert } from "../ErrorAlert";

import { Button, Form, Input, Link, SendingSpinerContainer } from "./styles";

export const FormLoginPage = () => {
  const navigate = useNavigate();
  const { auth, isLogged } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSending(true);

    const result = await auth(email, password);

    if (result.isLogged) {
      setErrorMessage(null);
      setIsSending(false);
      redirectToDashboard();
    } else {
      setErrorMessage(result.message);
      setIsSending(false);
    }
  };

  const redirectToDashboard = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  useEffect(() => {
    if (isLogged) redirectToDashboard();
  }, [isLogged, redirectToDashboard]);

  return (
    <>
      <h1>Sign In</h1>

      <Form onSubmit={(event) => handleSubmit(event)}>
        <Input
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <Input
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button type="submit">Fazer login</Button>

        {errorMessage && (
          <ErrorAlert
            icon={<FiAlertTriangle />}
            message={errorMessage}
            style={{ marginTop: 20 }}
          />
        )}

        {isSending && (
          <SendingSpinerContainer>
            <FiRefreshCw size={30} />
            <span>Autenticando...</span>
          </SendingSpinerContainer>
        )}
      </Form>

      <Link to={"/signup"}>Criar conta</Link>
    </>
  );
};
