defmodule BackendWeb.CnabView do
  use BackendWeb, :view

  alias Backend.Cnab

  def render("cnab_list.json", %{items: items}) do
    render_many(items, __MODULE__, "cnab.json")
  end

  def render("cnab.json", %{cnab: %Cnab{} = cnab}) do
    cnab
  end
end
