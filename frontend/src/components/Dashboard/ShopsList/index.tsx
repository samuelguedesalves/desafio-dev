import React from "react";

import { formatCurrency } from "../../../utils/formatCurrency";

import { Container, Span } from "./styled";
import { useShops } from "../../../hooks/useShops";
import { useNavigate } from "react-router-dom";

export const ShopsList: React.FC = () => {
  const navigate = useNavigate();

  const { shops } = useShops();

  function navigateToShopDetails(shopIndex: number) {
    navigate(`details/${shopIndex}`);
  }

  return (
    <>
      {shops.length > 0 ? (
        shops.map((shop, index) => (
          <Container key={index}>
            <span>{shop.shop_name}</span>
            <span>{formatCurrency(shop.amount)}</span>

            <button onClick={() => navigateToShopDetails(index)}>
              Ver transações
            </button>
          </Container>
        ))
      ) : (
        <Span>
          Não foi encontrado nenhum registro na base de dados. <br />
          Faça o upload do arquivo CNAB para começar.
        </Span>
      )}
    </>
  );
};
