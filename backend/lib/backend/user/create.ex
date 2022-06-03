defmodule Backend.User.Create do
  alias Backend.{User, Repo}

  def call(attrs) do
    attrs
    |> User.changeset()
    |> Repo.insert()
  end
end
