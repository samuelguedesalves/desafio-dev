import type { Transaction } from "../../../types/Transaction";

import React, { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiMinus, FiPlus } from "react-icons/fi";

import { formatCpf } from "../../../utils/formatCpf";
import { formatCurrency } from "../../../utils/formatCurrency";

import { useShops } from "../../../hooks/useShops";

import { Article, Section, Span } from "./styles";

export const ShopDetails: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { isLoaded, shops } = useShops();

  const shopIndex = useCallback(() => {
    return parseInt(params.shopIndex as string);
  }, [params]);

  function comeBack() {
    navigate("/dashboard");
  }

  return (
    <>
      {isLoaded ? (
        shops[shopIndex()] ? (
          <Section>
            <nav>
              <button onClick={() => comeBack()}>
                <FiArrowLeft />
                Voltar
              </button>
            </nav>
            <header>
              <h3>{shops[shopIndex()].shop_name}</h3>
              <p>Saldo: {formatCurrency(shops[shopIndex()].amount)}</p>
            </header>
            <main>
              {shops[shopIndex()].transactions.map((transaction, index) => (
                <TransactionItem key={index} transaction={transaction} />
              ))}
            </main>
          </Section>
        ) : (
          <Span>Loja não encontrada</Span>
        )
      ) : (
        <Span>Carregando...</Span>
      )}
    </>
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
