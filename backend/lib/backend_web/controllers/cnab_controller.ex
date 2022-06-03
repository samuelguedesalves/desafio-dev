defmodule BackendWeb.CnabController do
  use BackendWeb, :controller

  alias Backend.Cnab.Create, as: CreateCnab
  alias Backend.Cnab.Get, as: GetCnab
  alias Backend.User

  alias BackendWeb.{AuthPlug, CnabView, FallbackController, Helpers.GetAssignUser}

  plug AuthPlug

  action_fallback FallbackController

  def index(conn, _params) do
    with {:ok, %User{id: user_id}} <- GetAssignUser.call(conn),
         items <- GetCnab.by_user_id(user_id) do
      conn
      |> put_status(:ok)
      |> put_view(CnabView)
      |> render("cnab_list.json", %{items: items})
    end
  end

  def upload_file(conn, params) do
    with {:ok, %User{id: user_id}} <- GetAssignUser.call(conn),
         {:ok, filename} <- get_filename(params),
         items when is_list(items) <- CreateCnab.call(filename, user_id) do
      conn
      |> put_status(:ok)
      |> put_view(CnabView)
      |> render("cnab_list.json", %{items: items})
    else
      {:error, :filename_not_found} ->
        {:error, %{status: :bad_request, result: "error to find filename"}}

      {:error, :invalid_item} ->
        {:error, %{status: :bad_request, result: "error to parse cnab file"}}

      _ ->
        {:error, %{status: :internal_server_error, result: "internal server error"}}
    end
  end

  defp get_filename(%{"file" => %{path: filename}}), do: {:ok, filename}
  defp get_filename(_params), do: {:error, :filename_not_found}
end
