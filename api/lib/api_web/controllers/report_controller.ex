defmodule ApiWeb.ReportController do
  use ApiWeb, :controller
  alias Api.Fleet
  alias Api.Repo

  def fleet_summary(conn, _params) do
    vehicles = Repo.all(Fleet.Vehicle)

    header = "Placa,Modelo,Data de Cadastro"

    rows =
      Enum.map_join(vehicles, "\n", fn v ->
        "#{v.plate},#{v.model},#{v.inserted_at}"
      end)

    csv_content = header <> "\n" <> rows

    conn
    |> put_resp_content_type("text/csv")
    |> put_resp_header("content-disposition", "attachment; filename=\"relatorio_frota.csv\"")
    |> send_resp(200, csv_content)
  end

  def incident_report(conn, _params) do
    alerts =
      Fleet.Alert
      |> Repo.all()
      |> Repo.preload(:vehicle)

    header = "ID,Tipo,Veiculo,Mensagem,Data"

    rows =
      Enum.map_join(alerts, "\n", fn a ->
        plate = if a.vehicle, do: a.vehicle.plate, else: "N/A"
        "#{a.id},#{a.type},#{plate},\"#{a.message}\",#{a.inserted_at}"
      end)

    csv_content = header <> "\n" <> rows

    conn
    |> put_resp_content_type("text/csv")
    |> put_resp_header("content-disposition", "attachment; filename=\"relatorio_incidentes.csv\"")
    |> send_resp(200, csv_content)
  end
end
