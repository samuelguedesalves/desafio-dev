defmodule BackendWeb.AuthPlug do
  import Plug.Conn
  import Phoenix.Controller, only: [json: 2]

  alias Backend.Guardian, as: GuardianAuth
  alias Backend.User
  alias Backend.User.Get, as: GetUser

  def init(default), do: default

  def call(conn, _default) do
    with {:ok, token} <- get_connection_token(conn),
         {:ok, %{"sub" => user_id}} <- GuardianAuth.decode_and_verify(token),
         %User{} = user <- GetUser.by_id(user_id) do
      assign(conn, :user, user)
    else
      _ ->
        conn
        |> put_status(:bad_request)
        |> json(%{message: "invalid or unformated token"})
        |> halt()
    end
  end

  defp get_connection_token(conn) do
    with token when token != [] <- get_req_header(conn, "authorization"),
         [token | _tail] <- token,
         ["bearer", token] <- String.split(token, " ") do
      {:ok, token}
    end
  end
end
