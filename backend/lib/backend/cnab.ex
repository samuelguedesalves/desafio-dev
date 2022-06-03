defmodule Backend.Cnab do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.User

  @fields [
    :type,
    :date,
    :amount,
    :cpf,
    :card,
    :hour,
    :shop_owner,
    :shop_name,
    :user_id
  ]

  @except_fields [:user_id, :user, :__meta__, :__struct__]

  @derive {Jason.Encoder, except: @except_fields}
  schema "cnab" do
    field :type, :string
    field :date, :date
    field :amount, :integer
    field :cpf, :string
    field :card, :string
    field :hour, :time
    field :shop_owner, :string
    field :shop_name, :string
    field :user_id, :integer
    belongs_to :user, User, define_field: false

    timestamps()
  end

  def changeset(attrs) do
    %__MODULE__{}
    |> cast(attrs, @fields)
    |> validate_required(@fields)
  end
end
