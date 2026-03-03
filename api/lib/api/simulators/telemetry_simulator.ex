defmodule Api.Simulators.TelemetrySimulator do
  @moduledoc """
  GenServer that simulates 3 vehicles sending telemetry data every 5 seconds.
  """
  use GenServer
  alias Api.Fleet

  @interval :timer.seconds(5)

  # Client API
  def start_link(_opts) do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  # Server Callbacks
  @impl true
  def init(_) do
    # Ensure vehicles exist in the database
    ensure_vehicles_exist()

    # Start simulation loop
    schedule_telemetry()
    {:ok, %{}}
  end

  @impl true
  def handle_info(:send_telemetry, state) do
    vehicles = Fleet.list_vehicles()
    IO.puts("Simulator: Sending telemetry for #{length(vehicles)} vehicles")

    Enum.each(vehicles, fn vehicle ->
      telemetry_data = generate_mock_telemetry(vehicle.id)
      IO.puts("Simulator: Broadcasting telemetry for #{vehicle.plate}")
      # Broadcast via PubSub
      Phoenix.PubSub.broadcast(Api.PubSub, "telemetry_events", {:telemetry, telemetry_data})
    end)

    schedule_telemetry()
    {:noreply, state}
  end

  # Helper functions
  defp schedule_telemetry do
    Process.send_after(self(), :send_telemetry, @interval)
  end

  defp ensure_vehicles_exist do
    vehicles_to_create = [
      %{plate: "INF-001", model: "Volvo FH"},
      %{plate: "INF-002", model: "Scania R450"},
      %{plate: "INF-003", model: "Mercedes Actros"}
    ]

    existing = Fleet.list_vehicles()

    if length(existing) < 3 do
      Enum.each(vehicles_to_create, fn attrs ->
        unless Enum.find(existing, &(&1.plate == attrs.plate)) do
          Fleet.create_vehicle(attrs)
        end
      end)
    end
  end

  defp generate_mock_telemetry(vehicle_id) do
    %{
      vehicle_id: vehicle_id,
      latitude: -23.5505 + (:rand.uniform() - 0.5) / 100,
      longitude: -46.6333 + (:rand.uniform() - 0.5) / 100,
      speed: Float.round(:rand.uniform() * 100, 2), # Random speed up to 100km/h
      fuel_level: Float.round(:rand.uniform() * 100, 2),
      inserted_at: DateTime.utc_now()
    }
  end
end
