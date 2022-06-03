defmodule BackendWeb.UserController do
  use BackendWeb, :controller

  alias Backend.User
  alias BackendWeb.{FallbackController, UserView}
  alias User.Auth, as: AuthUser
  alias User.Create, as: CreateUser

  action_fallback FallbackController

  def create(conn, attrs) do
    with {:ok, attrs} <- cast_params_to_create(attrs),
         {:ok, user} <- CreateUser.call(attrs),
         {:ok, user, access_token} <- AuthUser.call(user) do
      conn
      |> put_status(:ok)
      |> put_view(UserView)
      |> render("created.json", %{user: user, token: access_token})
    else
      {:error, :invalid_params} ->
        {:error, %{status: :bad_request, result: "invalid params"}}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:error, %{status: :bad_request, result: changeset}}
    end
  end

  defp cast_params_to_create(%{"email" => email, "name" => name, "password" => password}) do
    {:ok, %{name: name, email: email, password: password}}
  end

  defp cast_params_to_create(_attrs), do: {:error, :invalid_params}

end
