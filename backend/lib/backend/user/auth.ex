defmodule Backend.User.Auth do
  alias Backend.Guardian, as: GuardianAuth
  alias Backend.User
  alias User.Get, as: GetUser

  def call(%{email: email, password: password}) do
    with {:ok, %User{id: id, password_hash: password_hash} = user} <- GetUser.by_email(email),
         :ok <- check_password(password, password_hash),
         {:ok, access_token, _} <- GuardianAuth.encode_and_sign(id, %{}, ttl: {24, :hours}) do
      {:ok, user, access_token}
    end
  end

  def call(%User{id: id} = user) do
    {:ok, access_token, _} = GuardianAuth.encode_and_sign(id, %{}, ttl: {24, :hours})

    {:ok, user, access_token}
  end

  defp check_password(password, password_hash) do
    if Pbkdf2.verify_pass(password, password_hash),
      do: :ok,
      else: {:error, :invalid_password}
  end
end
