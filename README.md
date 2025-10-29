# 📊 Dashboard de Gráficos

Uma aplicação React moderna e elegante que demonstra 8 tipos diferentes de visualizações de dados usando Material-UI X Charts. O projeto apresenta um dashboard interativo com gráficos responsivos, animações suaves e uma interface de usuário intuitiva.

## ✨ Funcionalidades

### 🎯 Tipos de Gráficos

1. **📈 Gráfico de Linha (LineChart)**
   - Visualização de vendas e receita ao longo dos meses
   - Múltiplas séries de dados com curvas naturais
   - Ideal para mostrar tendências temporais

2. **📊 Gráfico de Barras (BarChart)**
   - Comparação de três produtos (A, B, C) por trimestre
   - Visualização clara de dados categóricos
   - Cores diferenciadas para cada série

3. **🥧 Gráfico de Pizza (PieChart)**
   - Distribuição percentual por categorias (Desktop, Mobile, Tablet, Smart TV, Outros)
   - **Funcionalidade interativa:** Clique em qualquer fatia para abrir um modal detalhado
   - Anel interno com visualização moderna
   - Efeitos de hover e destaque

4. **📉 Gráfico de Área (AreaChart)**
   - Visualização de usuários ativos e novos usuários por dia da semana
   - Gráfico empilhado (stacked) para comparação
   - Preenchimento com área colorida

5. **🎯 Gráfico de Dispersão (ScatterChart)**
   - Análise de correlação entre tempo de estudo (horas) e notas
   - Útil para identificar padrões e relacionamentos em dados

6. **⚡ Sparkline Chart**
   - Gráficos compactos de linha e barras
   - Ideal para visualizações rápidas de tendências
   - Mostra tooltip e highlight ao passar o mouse

7. **🎚️ Gauge Chart**
   - Medidor visual de percentual (75%)
   - Design em formato de arco semicircular
   - Ideal para KPIs e métricas de performance

8. **🕸️ Gráfico Radar**
   - Visualização de performance em múltiplas dimensões
   - Avalia: Velocidade, Segurança, Usabilidade, Design, Funcionalidades e Suporte
   - Perfeito para análises comparativas multi-critério

### 🌟 Funcionalidades Especiais

#### Modal Interativo do Gráfico de Pizza
Ao clicar em qualquer fatia do gráfico de pizza, um modal detalhado é aberto contendo:

- **Cards de Resumo:**
  - Total de Itens
  - Valor Total (formatado em R$)
  - Crescimento percentual (com indicador de cor)

- **Gráfico de Barras de Vendas Mensais:**
  - Visualização das vendas da categoria selecionada ao longo de 12 meses
  - Cores dinâmicas baseadas na categoria

- **Tabela de Materiais:**
  - Distribuição detalhada dos materiais por categoria
  - Cards individuais com quantidade de cada item
  - Layout responsivo em grid

### 🎨 Características de Design

- **Tema Moderno:** Paleta de cores customizada com gradientes
- **Animações Suaves:** Efeitos de fade-in e float nos elementos
- **Responsividade Total:** Layout adaptável para desktop, tablet e mobile
- **Efeitos de Hover:** Cards elevam e destacam ao passar o mouse
- **UI Consistente:** Sistema de design unificado usando Material-UI

## 🛠️ Tecnologias Utilizadas

- **React 19.1.1** elevada à versão 19.1.1
- **TypeScript 5.9.3** para type safety
- **Vite 7.1.14** (rolldown-vite) para build rápido
- **Material-UI (MUI) 7.3.4** para componentes UI
- **MUI X Charts 8.15.0** para visualizações de dados
- **Emotion** para estilização CSS-in-JS
- **ESLint** para qualidade de código

## 📦 Instalação

```bash
# Clone o repositório (se aplicável)
# cd demo-charts

# Instale as dependências
npm install
```

## 🚀 Executando o Projeto

```bash
# Modo desenvolvimento (github pages ou servidor local)
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview

# Verificação de tipos TypeScript
npm run type-check

# Linting
npm run lint
```

## 📁 Estrutura do Projeto

```
demo-charts/
├── src/
│   ├── components/
│   │   ├── AreaChart.tsx          # Gráfico de área
│   │   ├── BarChart.tsx           # Gráfico de barras
│   │   ├── GaugeChart.tsx         # Gráfico gauge
│   │   ├── LineChart.tsx          # Gráfico de linha
│   │   ├── PieChart.tsx           # Gráfico de pizza (com interatividade)
│   │   ├── PieChartModal.tsx      # Modal detalhado do gráfico de pizza
│   │   ├── RadarChart.tsx         # Gráfico radar
│   │   ├── ScatterChart.tsx       # Gráfico de dispersão
│   │   └── SparklineChart.tsx     # Gráfico sparkline
│   ├── App.tsx                    # Componente principal do dashboard
│   ├── App.css                    # Estilos do App
│   ├── index.css                  # Estilos globais
│   └── main.tsx                   # Ponto de entrada da aplicação
├── public/                        # Arquivos estáticos
├── dist/                          # Build de produção
├── package.json
├── tsconfig.json                  # Configuração TypeScript
└── vite.config.ts                 # Configuração Vite
```

## 🎯 Uso

O dashboard é totalmente funcional e demonstra cada tipo de gráfico com dados de exemplo. Você pode:

1. **Visualizar** todos os gráficos no dashboard principal
2. **Interagir** com o gráfico de pizza clicando nas fatias
3. **Explorar** o modal detalhado com informações adicionais
4. **Observar** animações e efeitos visuais ao navegar

## 🔧 Customização

### Modificando Dados dos Gráficos

Cada componente de gráfico possui dados mockados que podem ser facilmente substituídos. Por exemplo, em `LineChart.tsx`:

```typescript
const data: SeriesData[] = [
  { id: 'vendas', label: 'Vendas', data: [120, 145, 138, 162, 178, 195, 210] },
  { id: 'receita', label: 'Receita', data: [80, 95, 110, 125, 140, 155, 170] },
];
```

### Alterando Cores

As cores podem ser customizadas através do tema do Material-UI em `App.tsx` ou diretamente nas props `colors` de cada gráfico.

### Adicionando Novos Gráficos

1. Crie um novo componente em `src/components/`
2. Importe e adicione no `App.tsx`
3. Ajuste o layout do Grid conforme necessário

## 📱 Responsividade

O dashboard utiliza o sistema de Grid do Material-UI para garantir que todos os gráficos sejam exibidos corretamente em diferentes tamanhos de tela:

- **Desktop:** Layout em 2 colunas para gráficos menores
- **Tablet:** Layout adaptativo mantendo a legibilidade
- **Mobile:** Gráficos em coluna única para melhor visualização

## 🎨 Paleta de Cores

O projeto utiliza uma paleta moderna baseada em:

- **Primary:** `#6366f1` (Índigo)
- **Secondary:** `#ec4899` (Rosa)
- **Success:** `#34d399` (Verde)
- **Warning:** `#fbbf24` (Amarelo)
- **Info:** `#60a5fa` (Azul)

## 📄 Licença

Este projeto é uma demonstração educacional. Sinta-se livre para usar e modificar conforme necessário.

## 🙏 Agradecimentos

- Material-UI por fornecer componentes incríveis
- MUI X Charts pela excelente biblioteca de gráficos
- Comunidade React pelo suporte contínuo

---

**Desenvolvido com ❤️ usando React + TypeScript + Material-UI**
