# 🚚 Infleet - Painel de Gestão de Frota e Telemetria (Full-Stack)

Uma plataforma completa para gestão inteligente de frotas, unindo um frontend moderno em React a um backend robusto em Elixir/Phoenix. O sistema oferece monitoramento em tempo real, telemetria avançada, insights gerados por IA e relatórios automatizados.

---

## ✨ Funcionalidades Principais

### 💻 Frontend (Dashboard)
- **Dashboard Central**: Visão holística da frota com métricas de saúde e economia.
- **AI Copilot Insights**: Sugestões acionáveis geradas por inteligência artificial (Gemini) baseadas em telemetria em tempo real.
- **Sistema Premium de Notificações**: Alertas críticos em tempo real com "Push Toasts" animados, avisos sonoros polifónicos e vibrações nativas.
- **Notification Center**: Painel de controle lateral completo para consultar histórico de incidentes em formato glassmorphism.
- **Monitoramento em Mapa**: Localização live dos veículos integrando telemetria e status.
- **Relatórios**: Geração de relatórios de incidentes (CSV) e de sustentabilidade (PDF).
- **Interface Premium UX**: Design dark mode de alta performance, dropdowns de perfil de usuário e animações fluidas focadas em produtividade.

### ⚙️ Backend (API & Processamento)
- **Telemetria Live**: Socket Phoenix para transmissão de dados de veículos em tempo real.
- **Processamento de Alertas**: Pipeline Broadway para detecção automática de excesso de velocidade e frenagem brusca.
- **Jobs em Segundo Plano**: Oban para processamento resiliente de notificações e alertas.
- **Simulador de Frota**: Sistema GenServer que simula telemetria constante para demonstração.
- **AI Service**: Integração segura com Google Gemini API para análise de dados.

---

## 🛠️ Stack Tecnológica

### Frontend
- **React 19** + **TypeScript**
- **Vite** (Build Tool)
- **Tailwind CSS v4** (Styling)
- **jsPDF** (Relatórios PDF)
- **Phoenix JS Client** (WebSockets)

### Backend
- **Elixir** + **Phoenix Framework**
- **Ecto** (ORM & Migrations)
- **PostgreSQL (Neon)** (Banco de Dados)
- **Broadway** (Data Ingestion)
- **Oban** (Background Processing)
- **Req** (HTTP Client para IA)

---

## 🚀 Como Iniciar

### Variáveis de Ambiente
Crie arquivos `.env` ou configure as variáveis no seu ambiente:

**Backend (`api/.env.production` ou variáveis de ambiente):**
- `DATABASE_URL`: URL de conexão do PostgreSQL (Neon).
- `GEMINI_API_KEY`: Sua chave da Google AI Studio.
- `SECRET_KEY_BASE`: Chave de segurança do Phoenix.
- `PHX_HOST`: Host de produção (ex: `infleet-api.onrender.com`).

**Frontend:**
- `VITE_API_URL`: URL da sua API Phoenix (ex: `https://infleet-api.onrender.com/api`).

---

### Execução Local

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/FabCode100/Infleet.git
   cd Infleet
   ```

2. **Backend (Elixir)**:
   ```bash
   cd api
   mix deps.get
   mix ecto.setup   # Cria banco e roda sementes
   mix phx.server
   ```

3. **Frontend (React)**:
   ```bash
   cd ..
   npm install
   npm run dev
   ```

Acesse o painel em `http://localhost:3000`.

---

## 📂 Estrutura do Projeto

```text
/
├── api/                  # Backend Elixir/Phoenix
│   ├── lib/api/          # Lógica de negócio (Fleet, Services, IA)
│   ├── lib/api_web/      # Controllers, Channels e Router
│   ├── priv/repo/        # Migrations e Seeds
│   └── Dockerfile        # Configuração para Deploy
├── src/                  # Frontend React
│   ├── components/       # Componentes de UI
│   ├── hooks/            # Hooks customizados (useFleet, useCopilot)
│   ├── services/         # Integrações (aiService, fleetSocket)
│   └── views/            # Telas da aplicação
├── render.yaml           # Configuração de Infraestrutura (Render)
├── package.json          # Dependências do Frontend
└── README.md             # Documentação
```

---

## 🌐 Deploy

A plataforma está pronta para deploy automatizado:
- **Banco de Dados**: Neon (PostgreSQL Serverless).
- **Backend (API)**: Render.com (utilizando o `render.yaml` incluso).
- **Frontend**: Vercel ou Render Static Site.

---

## 📝 Notas de Versão
- **v1.1**: Adicionado suporte a relatórios PDF de Sustentabilidade.
- **v1.2**: Migração para Gemini 2.5/2.0 Flash para insights em tempo real.
- **v1.3**: Correção de roteamento de relatórios e normalização de caminhos de API.
- **v1.4**: Implementação do sistema premium de Notificações Push, Alertas Críticos (Toasts/Sons) e Menus Interativos.

---

**Infleet Dashboard - Gestão de Frota Conectada**
