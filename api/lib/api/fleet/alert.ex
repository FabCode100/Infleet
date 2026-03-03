defmodule Api.Fleet.Alert do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "alerts" do
    field :type, :string
    field :message, :string
    belongs_to :vehicle, Api.Fleet.Vehicle

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(alert, attrs) do
    alert
    |> cast(attrs, [:vehicle_id, :type, :message])
    |> validate_required([:vehicle_id, :type, :message])
  end
end
