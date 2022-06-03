defmodule Backend.Cnab.Create do
  alias Backend.{Cnab, Cnab.Parse, Repo}

  def call(filename, user_id) do
    filename
    |> Parse.call()
    |> Enum.map(&apply_changeset(&1, user_id))
    |> cast_items()
    |> insert_items()
    |> IO.inspect()
  end

  defp apply_changeset(attrs, user_id) do
    attrs
    |> Map.put(:user_id, user_id)
    |> Cnab.changeset()
  end

  defp cast_items(items) do
    if Enum.all?(items, &check_valid_changeset_item(&1)),
      do: {:ok, items},
      else: {:error, :invalid_item}
  end

  defp check_valid_changeset_item(%Ecto.Changeset{valid?: true}), do: true
  defp check_valid_changeset_item(_changeset), do: false

  defp insert_items({:ok, items}) do
    items
    |> Enum.map(fn item ->
      item
      |> Repo.insert()
      |> handle_insert()
    end)
  end

  defp insert_items({:error, _reason} = error), do: error

  defp handle_insert({:ok, result}), do: result
  defp handle_insert({:error, reason}), do: reason
end
