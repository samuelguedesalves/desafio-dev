import type { Shop } from "../../../types/Shop";
import type { Transaction } from "../../../types/Transaction";

import { useEffect } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

import { formatCpf } from "../../../utils/formatCpf";
import { formatCurrency } from "../../../utils/formatCurrency";

import { Article, Section } from "./styles";

type ShopDetailsProps = {
  shopData: Shop;
};

export const ShopDetails: React.FC<ShopDetailsProps> = ({ shopData }) => {
  useEffect(() => {
    console.log(shopData);
  });

  return (
    <Section>
      <header>
        <h3>{shopData.shop_name}</h3>
        <p>Saldo: {formatCurrency(shopData.amount)}</p>
      </header>
      <main>
        {shopData.transactions.map((transaction, index) => (
          <TransactionItem key={index} transaction={transaction} />
        ))}
      </main>
    </Section>
  );
};

type TransactionItemProps = {
  transaction: Transaction;
};

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const incomeTypes = [
    "Débito",
    "Crédito",
    "Recebimento Empréstimo",
    "Vendas",
    "Recebimento TED",
    "Recebimento DOC",
  ];

  return (
    <Article>
      <div className="nature">
        {incomeTypes.includes(transaction.type) ? <FiPlus /> : <FiMinus />}
      </div>

      <div className="amount">
        <p>{formatCurrency(transaction.amount)}</p>
      </div>

      <div className="details">
        <div>
          <p>{transaction.type}</p>
          <p>{transaction.card}</p>
        </div>
        <div>
          <p>{formatCpf(transaction.cpf)}</p>
          <p>
            {transaction.date} {transaction.hour}
          </p>
        </div>
      </div>
    </Article>
  );
};
