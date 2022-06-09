import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FiFileText, FiRefreshCw, FiXOctagon } from 'react-icons/fi';
import axios from 'axios';
import { ErrorRequestContainer, InputFileLabel, SendingContainer, SubmitButton, Title } from './styles';
import { useAuth } from '../../hooks/useAuth';

enum RequestStatus {
  noSent,
  sending,
  sent,
  error
}

type UploadModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
}

Modal.setAppElement('#root');

export const UploadModal: React.FC<UploadModalProps> = ({ modalIsOpen, closeModal }) => {
  const { token } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(RequestStatus.noSent);

  useEffect(() => {
    if (requestStatus === RequestStatus.sent) setRequestStatus(RequestStatus.noSent);
  }, [requestStatus]);

  function handleFile (event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  }

  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendRequest();
  }
  
  function sendRequest() {
    setRequestStatus(RequestStatus.sending);

    if (file) {
      let form = new FormData();
  
      form.append('file', file, file.name);
  
      axios.post(
        'http://localhost:4000/api/cnab/upload', 
        form, 
        { headers: { 
            Authorization: `bearer ${token}`
        }}
      ).then(response => {
        setRequestStatus(RequestStatus.sent);
        setFile(null);
        closeModal();
      }).catch(error => {
        setRequestStatus(RequestStatus.error);
      });
    }
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={ () => closeModal() }

      className='modal-content'
      overlayClassName='modal-overlay'
    >
      <Title>Envio de arquivo CNAB</Title>

      {
        requestStatus === RequestStatus.noSent ? (
          <form onSubmit={event => handleSubmit(event)}>
            <InputFileLabel selected={Boolean(file)} htmlFor="input-file">
              {
                !file ? (
                  <>
                    <FiFileText size={40} /> 
                    Selecionar arquivo
                  </>
                ) : (
                  <>
                    <FiFileText size={40} />
                    {file.name}
                  </>
                )
              }
            </InputFileLabel>

            <input 
              id="input-file" 
              type="file" 
              accept=".txt" 
              multiple={false} 
              style={{display: 'none'}}
              onChange={event => handleFile(event)}
              name="file"
            />

            <SubmitButton 
              type='submit' 
              disabled={file == null ? true : false}
            >Enviar arquivo</SubmitButton >
          </form>
        ) : requestStatus === RequestStatus.sending ? (
          <SendingContainer>
            <FiRefreshCw size={40} />
            Enviando arquivo...
          </SendingContainer>
        ) : requestStatus === RequestStatus.error && (
          <ErrorRequestContainer>
            <FiXOctagon size={40} />
            Erro durante o envio

            <button onClick={() => sendRequest()} >
              Tentar novamente
            </button>
          </ErrorRequestContainer>
        )
      }
    </Modal>
  )
}