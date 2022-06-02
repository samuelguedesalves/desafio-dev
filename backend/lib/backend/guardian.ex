defmodule Backend.Guardian do
  use Guardian, otp_app: :backend

  def subject_for_token(user_id, _claims), do: {:ok, user_id}

  def resource_from_claims(%{"sub" => user_id}), do: {:ok, user_id}
end
