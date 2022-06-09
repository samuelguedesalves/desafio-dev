import React, { useEffect, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Container } from "./styles";

export const LoginPage = () => {
  let navigate = useNavigate();

  const { auth, token } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [screenStatus, setScreenStatus] = useState<'notSent' | 'sending' | 'sent' | 'error'>('notSent');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    setScreenStatus('sending');

    const result = await auth(email, password);

    if(result.status === 'logged') {
      setErrorMessage(null);
      setScreenStatus('sent');
      redirectToDashboard();
    } else {
      setErrorMessage(result.message);
      setScreenStatus('error');
    }
  }

  function redirectToDashboard() {
    navigate('/dashboard');
  }

  useEffect(() => {
    if(screenStatus === 'notSent' && token != null) redirectToDashboard();
  }, [])

  return (
    <Container>
      <div className="content">

        <div className="form-container">
          <h1>Login</h1>

          {
            ['notSent', 'error', 'sent'].includes(screenStatus) ? (
              <form onSubmit={event => handleSubmit(event)}>
                <input 
                  type="email" 
                  placeholder="Seu email" 
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  />
                <input 
                  type="password" 
                  placeholder="Sua senha" 
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />

                <button type="submit">Fazer login</button>

                {errorMessage && (
                  <span className="error-message" >
                    Erro: {errorMessage}
                  </span>
                )}
              </form>
            ) : screenStatus === 'sending' && (
              <div className="sending-container">
                <FiRefreshCw size={40} />
                <span>Autenticando...</span>
              </div>
            )
          }
        </div>

      </div>
    </Container>
  );
}