defmodule Backend.Repo.Migrations.CreateCnabTable do
  use Ecto.Migration

  def change do
    create table("cnab") do
      add :tipo, :string
      add :data, :date
      add :valor, :integer
      add :cpf, :string
      add :cartao, :string
      add :hora, :time
      add :dono_loja, :string
      add :nome_loja, :string

      timestamps()
    end
  end
end
