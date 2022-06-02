defmodule Backend.Cnab do
  use Ecto.Schema

  import Ecto.Changeset

  @fields [
    :tipo,
    :data,
    :valor,
    :cpf,
    :cartao,
    :hora,
    :dono_loja,
    :nome_loja
  ]

  schema "cnab" do
    field :tipo, :string
    field :data, :date
    field :valor, :integer
    field :cpf, :string
    field :cartao, :string
    field :hora, :time
    field :dono_loja, :string
    field :nome_loja, :string

    timestamps()
  end

  def changeset(attrs) do
    %__MODULE__{}
    |> cast(attrs, @fields)
    |> validate_required(@fields)
  end
end
