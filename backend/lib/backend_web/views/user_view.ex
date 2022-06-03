defmodule BackendWeb.UserView do
  use BackendWeb, :view

  alias Backend.User

  def render("auth.json", %{user: user, token: token}) do
    %{
      message: "user is authenticated",
      token: token,
      user: render("user.json", %{user: user})
    }
  end

  def render("created.json", %{user: user, token: token}) do
    %{
      message: "created user",
      token: token,
      user: render("user.json", %{user: user})
    }
  end

  def render("user.json", %{user: %User{} = user}) do
    user
  end
end
