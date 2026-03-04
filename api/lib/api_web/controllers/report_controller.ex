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

  def sustainability_report(conn, _params) do
    # In a real app, this would use many tables.
    # Here we'll generate metrics based on the vehicles.
    vehicles = Repo.all(Fleet.Vehicle)

    header = "Veiculo,Emissao CO2 (kg/km),Economia Combustivel (L),Uso Eletrico (%)"

    rows =
      Enum.map_join(vehicles, "\n", fn v ->
        # Mocking some metrics based on the vehicle data for the report
        co2 = :rand.uniform(200) + 100
        saved = :rand.uniform(500)
        ev = if String.contains?(v.model, "Electric"), do: 100, else: :rand.uniform(20)

        "#{v.plate},#{co2},#{saved},#{ev}"
      end)

    csv_content = "RELATORIO DE SUSTENTABILIDADE - INFLEET\n#{header}\n#{rows}"

    conn
    |> put_resp_content_type("text/csv")
    |> put_resp_header(
      "content-disposition",
      "attachment; filename=\"relatorio_sustentabilidade.csv\""
    )
    |> send_resp(200, csv_content)
  end
end
