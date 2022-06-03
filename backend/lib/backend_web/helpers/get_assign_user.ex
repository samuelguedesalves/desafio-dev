defmodule BackendWeb.Helpers.GetAssignUser do
  alias Backend.User

  def call(%{assigns: %{user: %User{} = user}}), do: {:ok, user}

  def call(_conn), do: {:error, :user_not_assigned_at_connection}
end
