defmodule Backend.User.CreateTest do
  use ExUnit.Case, assync: true

  alias Backend.{Repo, User}
  alias Backend.User.Create, as: CreateUser

  import Backend.Factory

  describe "call/1" do
    setup do
      :ok = Ecto.Adapters.SQL.Sandbox.checkout(Repo)
    end

    test "when all map fields are valid, create a user" do
      user_attrs = build(:user_attrs)

      response = CreateUser.call(user_attrs)

      assert {:ok, %User{} = user} = response
      assert user_attrs.name == user.name
      assert user_attrs.email == user.email
      assert user.password_hash != nil
    end

    test "when map fields are invalid, return a changeset with erros" do
      user_attrs = build(:user_attrs, email: "samuel#gmail.com", password: "1234")

      response = CreateUser.call(user_attrs)

      expected_errors = [
        password: {
          "should be at least %{count} character(s)",
          [count: 6, validation: :length, kind: :min, type: :string]
        },
        email: {
          "has invalid format",
          [validation: :format]
        }
      ]

      assert {:error, %Ecto.Changeset{valid?: false} = changeset} = response
      assert expected_errors == changeset.errors
    end
  end
end
