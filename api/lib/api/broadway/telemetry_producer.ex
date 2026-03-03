defmodule Api.Broadway.TelemetryProducer do
  use GenStage
  require Logger

  def start_link(opts) do
    GenStage.start_link(__MODULE__, opts)
  end

  @impl true
  def init(_opts) do
    # Subscribe to the telemetry events
    Phoenix.PubSub.subscribe(Api.PubSub, "telemetry_events")
    {:producer, {[], 0}}
  end

  @impl true
  def handle_info({:telemetry, telemetry}, {queue, demand}) do
    Logger.debug("Broadway Producer: Received telemetry for #{telemetry.vehicle_id}")
    dispatch([telemetry | queue], demand)
  end

  @impl true
  def handle_demand(incoming_demand, {queue, demand}) do
    dispatch(queue, demand + incoming_demand)
  end

  defp dispatch(queue, demand) when demand > 0 and queue != [] do
    events = Enum.reverse(queue)
    {to_send, remaining} = Enum.split(events, demand)
    {:noreply, to_send, {Enum.reverse(remaining), demand - length(to_send)}}
  end

  defp dispatch(queue, demand) do
    {:noreply, [], {queue, demand}}
  end
end
