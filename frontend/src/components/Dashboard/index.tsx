import { useState } from "react";
import { UploadModal } from "../UploadModal";
import { Container } from "./styles";

export const Dashboard = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <>
      <Container>

        <div className="content">
          <header>
            <p className="" >CNAB Parser</p>

            <button
              onClick={() => openModal()}
            >Enviar arquivo CNAB</button>
          </header>

          <main>

          </main>
        </div>
      </Container>
      <UploadModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      />
    </>
  );
}