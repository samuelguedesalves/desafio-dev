defmodule Backend.User do
  use Ecto.Schema

  import Ecto.Changeset

  @fields [:name, :email, :password]
  @except_fields [:password, :password_hash, :__meta__, :__struct__]

  @derive {Jason.Encoder, except: @except_fields}
  schema "users" do
    field :name, :string
    field :email, :string
    field :password_hash, :string
    field :password, :string, virtual: true

    timestamps()
  end

  def changeset(attrs) do
    %__MODULE__{}
    |> cast(attrs, @fields)
    |> validate_format(:email, ~r/@/)
    |> validate_length(:password, min: 6)
    |> unique_constraint(:email)
    |> IO.inspect()
    |> hash_password()
  end

  defp hash_password(%Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset) do
    change(changeset, Pbkdf2.add_hash(password))
  end

  defp hash_password(%Ecto.Changeset{valid?: false} = changeset), do: changeset
end
