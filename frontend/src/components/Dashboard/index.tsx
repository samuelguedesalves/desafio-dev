import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { UploadModal } from "../UploadModal";
import { Container } from "./styles";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    function verifyToken() {
      if (!token) {
        navigate("/");
      }
    }

    verifyToken();
  }, [token, navigate]);

  return (
    <>
      <Container>
        <div className="content">
          <header>
            <p className="">CNAB Parser</p>

            <div className="right-container">
              <div className="user-info">
                {user && (
                  <>
                    <span>{user?.name}</span>
                    <span>{user?.email}</span>
                  </>
                )}
              </div>

              <button onClick={() => openModal()}>Enviar arquivo CNAB</button>
            </div>
          </header>

          <main></main>
        </div>
      </Container>
      <UploadModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </>
  );
};
