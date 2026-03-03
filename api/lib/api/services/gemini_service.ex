defmodule Api.Services.GeminiService do
  @moduledoc """
  Service to interact with Google Gemini API from the backend.
  """

  # Using v1beta as it has better support for standard model names
  @base_url "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"

  def generate_insight(telemetry_data, alerts) do
    api_key =
      :api
      |> Application.get_env(:gemini_api_key)
      |> to_string()
      |> String.trim()

    if api_key == "" or api_key == "nil" do
      {:error, "GEMINI_API_KEY not configured in backend"}
    else
      prompt = """
      Você é um assistente de IA especializado em gestão de frotas para a empresa Infleet.
      Analise os seguintes dados de telemetria e alertas recentes e forneça um insight curto, acionável e profissional em português para o gestor da frota.

      Dados de Telemetria Recente:
      #{Jason.encode!(telemetry_data)}

      Alertas Recentes:
      #{Jason.encode!(alerts)}

      Formate a resposta como uma única frase ou parágrafo curto (máximo 150 caracteres).
      Se houver excesso de velocidade, foque na segurança. Se houver baixo combustível, foque na logística.
      """

      body = %{
        contents: [
          %{
            parts: [
              %{text: prompt}
            ]
          }
        ]
      }

      url = "#{@base_url}?key=#{api_key}"

      case Req.post(url, json: body) do
        {:ok,
         %{
           status: 200,
           body: %{"candidates" => [%{"content" => %{"parts" => [%{"text" => text} | _]}} | _]}
         }} ->
          {:ok, String.trim(text)}

        {:ok, response} ->
          {:error, "Gemini API error: #{inspect(response.body)}"}

        {:error, reason} ->
          {:error, "HTTP request failed: #{inspect(reason)}"}
      end
    end
  end
end
