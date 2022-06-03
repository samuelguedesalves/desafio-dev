defmodule Backend.Factory do
  use ExMachina

  def user_attrs_factory do
    %{
      name: "samuel",
      email: "samuel@gmail.com",
      password: "123456"
    }
  end
end
