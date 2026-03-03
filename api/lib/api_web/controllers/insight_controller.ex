defmodule ApiWeb.InsightController do
  use ApiWeb, :controller

  alias Api.Services.GeminiService

  def generate(conn, %{"telemetry_data" => telemetry_data, "alerts" => alerts}) do
    case GeminiService.generate_insight(telemetry_data, alerts) do
      {:ok, insight} ->
        json(conn, %{insight: insight})

      {:error, reason} ->
        conn
        |> put_status(:service_unavailable)
        |> json(%{error: reason})
    end
  end
end
