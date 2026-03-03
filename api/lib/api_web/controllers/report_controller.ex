defmodule ApiWeb.ReportController do
  use ApiWeb, :controller
  alias Api.Fleet
  alias Api.Repo

  def fleet_summary(conn, _params) do
    vehicles = Repo.all(Fleet.Vehicle)
    
    csv_content = [
      ["Placa", "Modelo", "Inserido em"],
      Enum.map(vehicles, fn v -> [v.plate, v.model, v.inserted_at] end)
    ]
    |> List.flatten()
    |> Enum.map(&Enum.join(&1, ","))
    |> Enum.join("\n")

    conn
    |> put_resp_content_type("text/csv")
    |> put_resp_header("content-disposition", "attachment; filename=\"relatorio_frota.csv\"")
    |> send_resp(200, csv_content)
  end

  def incident_report(conn, _params) do
    alerts = Repo.all(Fleet.Alert) |> Repo.preload(:vehicle)
    
    csv_content = "ID,Tipo,Veiculo,Mensagem,Data\n" <>
      Enum.map_join(alerts, "\n", fn a ->
        "#{a.id},#{a.type},#{a.vehicle.plate},\"#{a.message}\",#{a.inserted_at}"
      end)

    conn
    |> put_resp_content_type("text/csv")
    |> put_resp_header("content-disposition", "attachment; filename=\"relatorio_incidentes.csv\"")
    |> send_resp(200, csv_content)
  end
end
