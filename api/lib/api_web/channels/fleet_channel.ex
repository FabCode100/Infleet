defmodule ApiWeb.FleetChannel do
  use ApiWeb, :channel

  @doc """
  Join the fleet channel. We use "fleet:all" to broadcast to everyone.
  """
  @impl true
  def join("fleet:all", _payload, socket) do
    {:ok, socket}
  end

  # Channels can be used for two-way communication, but for this portfolio
  # the backend mostly pushes data to the frontend.
  @impl true
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end
end
