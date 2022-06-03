defmodule Backend.Cnab.CreateTest do
  use ExUnit.Case

  alias Backend.{Cnab, User, Repo}
  alias Backend.User.Create, as: CreateUser
  alias Backend.Cnab.Create, as: CreateCnab

  import Backend.Factory

  describe "call/2" do
    setup do
      :ok = Ecto.Adapters.SQL.Sandbox.checkout(Repo)
    end

    test "when has a valid filename and user id, parse file data, insert and show result" do
      user_attrs = build(:user_attrs)
      filename_path = "./test/support/CNAB.txt"

      assert {:ok, %User{id: user_id}} = CreateUser.call(user_attrs)

      response = CreateCnab.call(filename_path, user_id)

      assert [%Cnab{} | _items] = response
    end
  end
end
