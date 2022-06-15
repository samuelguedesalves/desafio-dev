import React from "react";

import { formatCurrency } from "../../../utils/formatCurrency";

import { Container } from "./styled";
import { useShops } from "../../../hooks/useShops";
import { useNavigate } from "react-router-dom";

export const ShopsList: React.FC = ({}) => {
  const navigate = useNavigate();

  const { shops } = useShops();

  function navigateToShopDetails(shopIndex: number) {
    navigate(`details/${shopIndex}`);
  }

  return (
    <>
      {shops.map((shop, index) => (
        <Container key={index}>
          <span>{shop.shop_name}</span>
          <span>{formatCurrency(shop.amount)}</span>

          <button onClick={() => navigateToShopDetails(index)}>
            Ver transações
          </button>
        </Container>
      ))}
    </>
  );
};
