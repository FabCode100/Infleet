defmodule Api.Fleet do
  @moduledoc """
  The Fleet context.
  """

  import Ecto.Query, warn: false
  alias Api.Repo
  alias Api.Fleet.{Vehicle, Telemetry, Alert}

  def list_vehicles do
    Repo.all(Vehicle)
  end

  def create_vehicle(attrs \\ %{}) do
    %Vehicle{}
    |> Vehicle.changeset(attrs)
    |> Repo.insert()
  end

  def save_telemetry(attrs) do
    %Telemetry{}
    |> Telemetry.changeset(attrs)
    |> Repo.insert()
  end

  def create_alert(attrs) do
    %Alert{}
    |> Alert.changeset(attrs)
    |> Repo.insert()
  end
end
