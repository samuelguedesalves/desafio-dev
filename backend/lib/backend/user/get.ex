defmodule Backend.User.Get do
  alias Backend.Repo
  alias Backend.User

  import Ecto.Query

  def by_id(user_id), do: Repo.get(User, user_id)

  def by_email(email) do
    query = from u in User, where: u.email == ^email

    case Repo.one(query) do
      nil -> {:error, :user_not_found}
      user -> {:ok, user}
    end
  end
end
