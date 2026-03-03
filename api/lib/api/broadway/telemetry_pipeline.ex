defmodule Api.Broadway.TelemetryPipeline do
  use Broadway

  alias Broadway.Message
  alias Api.Fleet
  alias Api.Workers.AlertWorker

  def start_link(_opts) do
    Broadway.start_link(__MODULE__,
      name: __MODULE__,
      producer: [
        module: {Api.Broadway.TelemetryProducer, []},
        concurrency: 1,
        transformer: {__MODULE__, :transform_data, []}
      ],
      processors: [
        default: [concurrency: 5]
      ]
    )
  end

  def transform_data(data, _opts) do
    %Broadway.Message{
      data: data,
      acknowledger: {Broadway.NoopAcknowledger, nil, nil}
    }
  end

  @impl true
  def handle_message(_processor, message, _context) do
    telemetry_data = message.data
    require Logger
    Logger.info("Processing telemetry for vehicle: #{telemetry_data.vehicle_id}")

    # Save to database
    case Fleet.save_telemetry(telemetry_data) do
      {:ok, _telemetry} ->
        # Broadcast to channel
        ApiWeb.Endpoint.broadcast("fleet:all", "new_telemetry", telemetry_data)

        # Check for speed alert
        if telemetry_data.speed > 80 do
          AlertWorker.enqueue(telemetry_data)
          ApiWeb.Endpoint.broadcast("fleet:all", "speed_alert", %{
            vehicle_id: telemetry_data.vehicle_id,
            speed: telemetry_data.speed,
            message: "Velocidade acima do limite!"
          })
        end

        message

      {:error, _changeset} ->
        # In a real app, we might want to handle this differently
        Message.failed(message, "Save failed")
    end
  end
end
