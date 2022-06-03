defmodule Backend.Cnab.Parse do
  def build(filename) do
    filename
    |> File.stream!()
    |> Enum.map(&parse_line(&1))
  end

  defp parse_line(line) do
    line = String.trim(line)

    %{
      tipo: get_type(line),
      data: get_date(line),
      valor: get_amount(line),
      cpf: get_cpf(line),
      cartao: get_card(line),
      hora: get_hour(line),
      dono_loja: get_shop_owner(line),
      nome_loja: get_shop_name(line)
    }
  end

  defp get_card(line), do: String.slice(line, 30, 12)

  defp get_cpf(line), do: String.slice(line, 19, 11)

  defp get_shop_owner(line), do: String.slice(line, 48, 14) |> String.trim()

  defp get_shop_name(line), do: String.slice(line, 62, 19)

  defp get_hour(line) do
    full_hour = String.slice(line, 42, 6)

    hour = String.slice(full_hour, 0, 2) |> String.to_integer()
    minute = String.slice(full_hour, 2, 2) |> String.to_integer()
    second = String.slice(full_hour, 4, 2) |> String.to_integer()

    {:ok, time} = Time.new(hour, minute, second)

    time
  end

  defp get_date(line) do
    date = String.slice(line, 1, 8)

    year = String.slice(date, 0, 4) |> String.to_integer()
    month = String.slice(date, 4, 2) |> String.to_integer()
    day = String.slice(date, 6, 2) |> String.to_integer()

    {:ok, date} = Date.new(year, month, day)

    date
  end

  defp get_amount(line) do
    line
    |> String.slice(9, 10)
    |> Decimal.new()
    |> Decimal.to_integer()
  end

  defp get_type(line) do
    line
    |> String.slice(0, 1)
    |> String.to_integer()
    |> identify_type()
  end

  defp identify_type(1), do: "Débito"
  defp identify_type(2), do: "Boleto"
  defp identify_type(3), do: "Financiamento"
  defp identify_type(4), do: "Crédito"
  defp identify_type(5), do: "Recebimento Empréstimo"
  defp identify_type(6), do: "Vendas"
  defp identify_type(7), do: "Recebimento TED"
  defp identify_type(8), do: "Recebimento DOC"
  defp identify_type(9), do: "Aluguel"
end
