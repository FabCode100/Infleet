defmodule Api.Workers.AlertWorker do
  use Oban.Worker, queue: :alerts, max_attempts: 3

  alias Api.Fleet

  @impl Oban.Worker
  def perform(%Oban.Job{args: %{"vehicle_id" => vehicle_id, "speed" => speed} = _args}) do
    # Insert alert into table
    alert_attrs = %{
      vehicle_id: vehicle_id,
      type: "SPEED_EXCEDED",
      message: "Vehicle exceeded 80km/h. Recorded speed: #{speed} km/h"
    }

    case Fleet.create_alert(alert_attrs) do
      {:ok, alert} ->
        # Simulate notification (e.g., Log or External API)
        IO.puts("!!! ALERT NOTIFICATION SENT for vehicle #{vehicle_id}: #{alert.message}")
        :ok

      {:error, changeset} ->
        {:error, changeset}
    end
  end

  def enqueue(telemetry_data) do
    %{
      vehicle_id: telemetry_data.vehicle_id,
      speed: telemetry_data.speed
    }
    |> __MODULE__.new()
    |> Oban.insert()
  end
end
