import React, { useRef, useState } from "react";
import Modal from "react-modal";
import { FiFileText, FiRefreshCw, FiX, FiXOctagon } from "react-icons/fi";

import { useAuth } from "../../hooks/useAuth";

import {
  ErrorRequestContainer,
  InputFileLabel,
  SendingContainer,
  SubmitButton,
  Title,
  Form,
} from "./styles";

import { Api } from "../../service/api";
import { useShops } from "../../hooks/useShops";

type UploadModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
};

Modal.setAppElement("#root");

export const UploadModal: React.FC<UploadModalProps> = ({
  modalIsOpen,
  closeModal,
}) => {
  const { token } = useAuth();
  const { refreshShopsList } = useShops();
  const formRef = useRef<HTMLFormElement>(null);

  const [file, setFile] = useState<File | null>(null);

  const [isSending, setIsSending] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (file) uploadFile(file);
  }

  async function uploadFile(file: File): Promise<void> {
    setIsSending(true);

    let form = new FormData();
    form.append("file", file, file.name);

    await Api.post("/cnab/upload", form, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then(() => {
        setIsSending(false);
        setFile(null);
        refreshShopsList();
        closeModal();
      })
      .catch(() => {
        setIsSending(false);
        setErrorMessage("Erro ao enviar o arquivo");
      });
  }

  const trySendAgan = () => {
    setErrorMessage(null);

    if (formRef.current) formRef.current.requestSubmit();
  };

  const closeErrorMessage = () => {
    setErrorMessage(null);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => !isSending && closeModal()}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <header>
        <Title>Envio de arquivo CNAB</Title>
        <button
          className="close-modal"
          onClick={() => closeModal()}
          disabled={isSending}
        >
          <FiX />
        </button>
      </header>

      <Form ref={formRef} onSubmit={(event) => handleSubmit(event)}>
        <InputFileLabel selected={Boolean(file)} htmlFor="input-file">
          {!file ? (
            <>
              <FiFileText size={40} />
              Selecionar arquivo
            </>
          ) : (
            <>
              <FiFileText size={40} />
              {file.name}
            </>
          )}
        </InputFileLabel>

        <input
          id="input-file"
          type="file"
          accept=".txt"
          multiple={false}
          style={{ display: "none" }}
          onChange={(event) => handleFile(event)}
          name="file"
        />

        <SubmitButton type="submit" disabled={file == null ? true : false}>
          Enviar arquivo
        </SubmitButton>

        {isSending && (
          <SendingContainer>
            <FiRefreshCw size={40} />
            Enviando arquivo...
          </SendingContainer>
        )}

        {errorMessage && (
          <ErrorRequestContainer>
            <FiXOctagon size={40} />
            Erro durante o envio
            <button className="try-again" onClick={() => trySendAgan()}>
              Tentar novamente
            </button>
            <button className="cancel" onClick={() => closeErrorMessage()}>
              Cancelar
            </button>
          </ErrorRequestContainer>
        )}
      </Form>
    </Modal>
  );
};
