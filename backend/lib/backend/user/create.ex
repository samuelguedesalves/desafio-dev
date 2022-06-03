defmodule Backend.User.Create do
  alias Backend.{Repo, User}

  def call(attrs) do
    attrs
    |> User.changeset()
    |> Repo.insert()
  end
end
