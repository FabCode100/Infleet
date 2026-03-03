# 🚚 Infleet - Painel de Gestão de Frota e Telemetria

Uma aplicação front-end moderna, responsiva e de alta performance para monitoramento de frotas em tempo real, análise de telemetria, gestão de incidentes e relatórios ESG (Sustentabilidade).

Este projeto foi construído com foco na experiência do usuário (UX) e interface de usuário (UI) no estilo "Dark Mode" por padrão, utilizando as melhores práticas do ecossistema React.

---

## ✨ Funcionalidades

O painel está dividido em 5 módulos principais:

1. **📊 Dashboard (Visão Geral)**
   - Métricas principais (Veículos online, alertas ativos, economia de CO2).
   - Mapa de calor e localização em tempo real.
   - Lista rápida da frota e insights gerados por IA (Copilot).

2. **🗺️ Monitoramento em Tempo Real**
   - Mapa interativo com a posição exata de cada veículo.
   - Filtros rápidos (Todos, Em Movimento, Ocioso).
   - Feed de eventos e logs do sistema em tempo real.

3. **🚛 Detalhes do Veículo (Telemetria)**
   - Nível de combustível/bateria e estimativa de autonomia.
   - Gráficos de análise de velocidade e histórico.
   - Checklist de segurança (frenagens bruscas, curvas acentuadas).
   - Perfil de condução do motorista.

4. **⚠️ Central de Alertas e Incidentes**
   - Fila de eventos críticos (Pânico, Telemetria, Cerca Eletrônica).
   - Linha do tempo detalhada do incidente com dados de telemetria (Velocidade, Força G).
   - Ações rápidas (Ligar para o motorista, gerar relatório).

5. **🌱 Sustentabilidade (ESG)**
   - Relatórios de impacto ambiental (CO2 emitido, economia de combustível).
   - Taxa de adoção de Veículos Elétricos (VE).
   - Ranking ao vivo dos motoristas mais sustentáveis e eficientes.

---

## 🛠️ Tecnologias Utilizadas

- **[React 19](https://react.dev/)**: Biblioteca principal para construção da interface.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática para maior segurança e previsibilidade do código.
- **[Vite](https://vitejs.dev/)**: Bundler ultrarrápido para desenvolvimento.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Framework de CSS utilitário para estilização rápida e responsiva.
- **[Material Symbols](https://fonts.google.com/icons)**: Ícones modernos e consistentes do Google.
- **[Google Fonts (Inter)](https://fonts.google.com/specimen/Inter)**: Tipografia limpa e legível.

---

## 📂 Estrutura do Projeto

```text
/
├── public/               # Assets públicos estáticos
├── src/
│   ├── components/       # Componentes reutilizáveis (ex: Sidebar)
│   ├── data/             # Dados mockados para desenvolvimento (mockData.ts)
│   ├── views/            # Telas principais da aplicação
│   │   ├── Dashboard.tsx
│   │   ├── Monitoring.tsx
│   │   ├── VehicleDetails.tsx
│   │   ├── Alerts.tsx
│   │   └── Sustainability.tsx
│   ├── App.tsx           # Componente raiz e gerenciamento de rotas/estado
│   ├── index.css         # Configurações globais e variáveis do Tailwind
│   └── main.tsx          # Ponto de entrada do React
├── index.html            # Template HTML principal
├── package.json          # Dependências e scripts do projeto
├── tailwind.config.ts    # (Integrado via @theme no index.css no Tailwind v4)
└── vite.config.ts        # Configuração do Vite
```

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm, yarn ou pnpm

### Passos

1. **Clone o repositório** (se aplicável):
   ```bash
   git clone https://github.com/seu-usuario/infleet-dashboard.git
   cd infleet-dashboard
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Acesse no navegador**:
   Abra `http://localhost:3000` (ou a porta indicada no terminal).

---

## 🔌 Guia de Integração com o Backend

O projeto foi arquitetado para facilitar a integração com APIs reais. Atualmente, a aplicação consome dados estáticos localizados em `src/data/mockData.ts`.

Para conectar ao seu backend, siga estes passos em qualquer uma das telas (ex: `src/views/Dashboard.tsx`):

1. Localize o `useEffect` no início do componente.
2. Remova os dados iniciais do `useState` (opcional, pode deixar como estado de loading).
3. Descomente e ajuste a chamada `fetch` ou utilize bibliotecas como `axios` ou `React Query`.

**Exemplo de integração:**

```tsx
import React, { useState, useEffect } from 'react';

export function Dashboard({ onNavigate }) {
  // 1. Inicie com um estado vazio ou de loading
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2. Faça a chamada para a sua API real
    fetch('https://sua-api.com/v1/dashboard')
      .then(response => response.json())
      .then(apiData => {
        setData(apiData);
        setLoading(false);
      })
      .catch(error => console.error("Erro ao buscar dados:", error));
  }, []);

  if (loading) return <div>Carregando painel...</div>;

  return (
    // ... renderização do componente usando {data.totalVehicles}, etc.
  );
}
```

### Endpoints Sugeridos para a API
Para que o frontend funcione perfeitamente, sugerimos que o seu backend forneça os seguintes endpoints (baseados na estrutura do `mockData.ts`):

- `GET /api/dashboard` - Resumo geral, lista rápida de veículos e alertas.
- `GET /api/monitoring` - Posições em tempo real da frota e feed de eventos.
- `GET /api/vehicles/:id` - Dados detalhados de telemetria de um veículo específico.
- `GET /api/alerts` - Fila de incidentes críticos e histórico.
- `GET /api/sustainability` - Métricas ESG e ranking de motoristas.

---

## 📝 Licença

Este projeto é de uso restrito e confidencial. Todos os direitos reservados.
