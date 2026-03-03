defmodule Api.Repo.Migrations.CreateFleetTables do
  use Ecto.Migration

  def change do
    create table(:vehicles, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :plate, :string, null: false
      add :model, :string, null: false

      timestamps(type: :utc_datetime)
    end

    create unique_index(:vehicles, [:plate])

    create table(:telemetries, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :vehicle_id, references(:vehicles, on_delete: :delete_all, type: :binary_id), null: false
      add :latitude, :float, null: false
      add :longitude, :float, null: false
      add :speed, :float, null: false
      add :fuel_level, :float, null: false

      timestamps(type: :utc_datetime, updated_at: false)
    end

    create index(:telemetries, [:vehicle_id])

    create table(:alerts, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :vehicle_id, references(:vehicles, on_delete: :delete_all, type: :binary_id), null: false
      add :type, :string, null: false
      add :message, :text, null: false

      timestamps(type: :utc_datetime)
    end

    create index(:alerts, [:vehicle_id])
  end
end
