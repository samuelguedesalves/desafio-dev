defmodule BackendWeb.CnabView do
  use BackendWeb, :view

  alias Backend.Cnab

  def render("cnab_list.json", %{items: items}) do
    handle_items(items)
  end

  defp handle_items([%Cnab{} | _items] = transactions_list) do
    Enum.reduce(transactions_list, [], fn transaction, acc ->
      acc
      |> find_shop_in_acc(transaction.shop_name)
      |> update_acc(transaction, acc)
    end)
  end

  defp handle_items(_transactions_list), do: []

  defp find_shop_in_acc(acc, to_query) do
    Enum.find(acc, fn %{shop_name: shop_name} ->
      shop_name == to_query
    end)
  end

  defp update_acc(shop, transaction, acc) when shop != nil do
    shop = Map.put(shop, :transactions, [transaction | shop.transactions])

    transaction_nature = get_transaction_nature(transaction)

    shop =
      if transaction_nature == :income do
        Map.put(shop, :amount, shop.amount + transaction.amount)
      else
        Map.put(shop, :amount, shop.amount - transaction.amount)
      end

    filtered_acc = filter_acc(acc, shop)

    [shop | filtered_acc]
  end

  defp update_acc(nil, transaction, acc) do
    transaction_nature = get_transaction_nature(transaction)

    amount =
      if transaction_nature == :income do
        transaction.amount
      else
        0 - transaction.amount
      end

    new_shop = %{
      shop_name: transaction.shop_name,
      amount: amount,
      transactions: [transaction]
    }

    [new_shop | acc]
  end

  defp get_transaction_nature(%{type: type}) do
    income_types = [
      "Débito",
      "Crédito",
      "Recebimento Empréstimo",
      "Vendas",
      "Recebimento TED",
      "Recebimento DOC"
    ]

    if type in income_types do
      :income
    else
      :outcome
    end
  end

  defp filter_acc(acc, %{shop_name: shop_name}) do
    Enum.filter(acc, fn shop ->
      shop.shop_name != shop_name
    end)
  end
end
