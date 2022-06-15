import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { Header } from "./Header";
import { UploadModal } from "../UploadModal";
import { ShopDetails } from "./ShopDetails";
import { ShopsList } from "./ShopsList";

import { useShops } from "../../hooks/useShops";
import { useAuth } from "../../hooks/useAuth";

import { Main } from "./styles";

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLogged } = useAuth();
  const { isLoaded } = useShops();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    function verifyLogged() {
      if (!isLogged) {
        navigate("/");
      }
    }

    verifyLogged();
  }, [isLogged, navigate]);

  return (
    <>
      {isLoaded && user && (
        <>
          <Header user={user} openModal={openModal} />

          <Main>
            <Routes>
              <Route path="/" element={<ShopsList />} />
              <Route path={`details/:shopIndex`} element={<ShopDetails />} />
            </Routes>
          </Main>
        </>
      )}

      <UploadModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </>
  );
};
