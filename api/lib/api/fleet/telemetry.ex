defmodule Api.Fleet.Telemetry do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "telemetries" do
    field :latitude, :float
    field :longitude, :float
    field :speed, :float
    field :fuel_level, :float
    belongs_to :vehicle, Api.Fleet.Vehicle

    timestamps(type: :utc_datetime, updated_at: false)
  end

  @doc false
  def changeset(telemetry, attrs) do
    telemetry
    |> cast(attrs, [:vehicle_id, :latitude, :longitude, :speed, :fuel_level])
    |> validate_required([:vehicle_id, :latitude, :longitude, :speed, :fuel_level])
  end
end
