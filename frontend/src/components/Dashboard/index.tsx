import type { Shop } from "../../types/Shop";

import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { UploadModal } from "../UploadModal";
import { Header } from "./Header";
import { ShopDetails } from "./ShopDetails";
import { ShopsList } from "./ShopsList";

import { useAuth } from "../../hooks/useAuth";
import { Api } from "../../service/api";

import { Main } from "./styles";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [shopItems, setShopItems] = useState<Shop[]>([]);

  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function navigateToShopDetails(shop: Shop) {
    setSelectedShop(shop);

    navigate("details");
  }

  useEffect(() => {
    function verifyToken() {
      if (!token) {
        navigate("/");
      }
    }

    verifyToken();
  }, [token, navigate]);

  useEffect(() => {
    async function fetchCnabList() {
      await Api.get("/cnab/list", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
        .then((resp) => {
          console.log(resp.data);
          setShopItems(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchCnabList();
  }, [token]);

  return (
    <>
      {user && (
        <>
          <Header user={user} openModal={openModal} />

          <Main>
            <Routes>
              <Route
                path="/"
                element={
                  <ShopsList
                    shopItems={shopItems}
                    navigateToShopDetails={navigateToShopDetails}
                  />
                }
              />
              <Route
                path={`details`}
                element={<ShopDetails shopData={selectedShop as Shop} />}
              />
            </Routes>
          </Main>
        </>
      )}

      <UploadModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </>
  );
};
