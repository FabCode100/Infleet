defmodule Api.Fleet.Vehicle do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "vehicles" do
    field :plate, :string
    field :model, :string

    has_many :telemetries, Api.Fleet.Telemetry
    has_many :alerts, Api.Fleet.Alert

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(vehicle, attrs) do
    vehicle
    |> cast(attrs, [:plate, :model])
    |> validate_required([:plate, :model])
    |> unique_constraint(:plate)
  end
end
