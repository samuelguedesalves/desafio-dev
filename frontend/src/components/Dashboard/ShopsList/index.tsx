import type { Shop } from "../../../types/Shop";

import React from "react";

import { formatCurrency } from "../../../utils/formatCurrency";

import { Container } from "./styled";

type ShopsListProps = {
  shopItems: Shop[];
  navigateToShopDetails: (shop: Shop) => void;
};

export const ShopsList: React.FC<ShopsListProps> = ({
  shopItems,
  navigateToShopDetails,
}) => {
  return (
    <>
      {shopItems.map((shop, index) => (
        <Container key={index}>
          <span>{shop.shop_name}</span>
          <span>{formatCurrency(shop.amount)}</span>

          <button onClick={() => navigateToShopDetails(shop)}>
            Ver transações
          </button>
        </Container>
      ))}
    </>
  );
};
