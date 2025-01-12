defmodule Backend.Cnab.Get do
  alias Backend.{Cnab, Repo}

  import Ecto.Query

  def by_user_id(user_id) do
    query = from c in Cnab, where: c.user_id == ^user_id

    Repo.all(query)
  end
end
