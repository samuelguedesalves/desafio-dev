defmodule Backend.Repo.Migrations.CreateCnabTable do
  use Ecto.Migration

  def change do
    create table("cnab") do
      add :type, :string
      add :date, :date
      add :amount, :integer
      add :cpf, :string
      add :card, :string
      add :hour, :time
      add :shop_owner, :string
      add :shop_name, :string
      add :user_id, references("users")

      timestamps()
    end
  end
end
