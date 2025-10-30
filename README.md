# 📊 Dashboard de Gráficos

Uma aplicação React moderna e elegante que demonstra 9 tipos diferentes de visualizações de dados usando Material-UI X Charts. O projeto apresenta um dashboard interativo com gráficos responsivos, animações suaves e uma interface de usuário intuitiva.

🌐 **Demo Online:** [https://caarlosandree.github.io/dash-demo/](https://caarlosandree.github.io/dash-demo/)

## ✨ Funcionalidades

### 🎯 Tipos de Gráficos

1. **📈 Gráfico de Linha (LineChart)**
   - Visualização de vendas e receita ao longo dos meses
   - Múltiplas séries de dados com curvas naturais
   - Ideal para mostrar tendências temporais
   - **Modal interativo** com detalhes e análises

2. **📊 Gráfico de Barras (BarChart)**
   - Comparação de três produtos (A, B, C) por trimestre
   - Visualização clara de dados categóricos
   - Cores diferenciadas para cada série
   - **Modal interativo** com estatísticas detalhadas

3. **🥧 Gráfico de Pizza (PieChart)**
   - Distribuição percentual por categorias (Desktop, Mobile, Tablet, Smart TV, Outros)
   - **Funcionalidade interativa:** Clique em qualquer fatia para abrir um modal detalhado
   - Anel interno com visualização moderna
   - Efeitos de hover e destaque

4. **📉 Gráfico de Área (AreaChart)**
   - Visualização de usuários ativos e novos usuários por dia da semana
   - Gráfico empilhado (stacked) para comparação
   - Preenchimento com área colorida
   - **Modal interativo** com métricas detalhadas

5. **🎯 Gráfico de Dispersão (ScatterChart)**
   - Análise de correlação entre tempo de estudo (horas) e notas
   - Útil para identificar padrões e relacionamentos em dados
   - **Modal interativo** com insights e análises

6. **⚡ Sparkline Chart**
   - Gráficos compactos de linha e barras
   - Ideal para visualizações rápidas de tendências
   - Mostra tooltip e highlight ao passar o mouse
   - **Modal interativo** com visualizações expandidas

7. **🎚️ Gauge Chart**
   - Medidor visual de percentual (75%)
   - Design em formato de arco semicircular
   - Ideal para KPIs e métricas de performance
   - **Modal interativo** com métricas detalhadas

8. **🕸️ Gráfico Radar**
   - Visualização de performance em múltiplas dimensões
   - Avalia: Velocidade, Segurança, Usabilidade, Design, Funcionalidades e Suporte
   - Perfeito para análises comparativas multi-critério
   - **Modal interativo** com análises detalhadas

9. **🔺 Gráfico de Funil (FunnelChart)**
   - Visualização de conversão em etapas
   - Ideal para análise de funil de vendas
   - **Modal interativo** com detalhes de cada etapa

### 🌟 Funcionalidades Especiais

#### 🎛️ Sistema de Abas
- **Dashboard Principal:** Visualização de todos os 9 tipos de gráficos
- **Estatísticas da Clínica:** Dashboard especializado com dados de agendamentos médicos

#### 🔧 Barra de Ferramentas Avançada
- **Sistema de Filtros Inteligente:**
  - Filtro por período (últimos 30 dias, 3 meses, 6 meses, 1 ano)
  - Filtro por categorias de dados
  - Filtro por tipos de gráficos
  - Filtro por faixa de valores
  - Controle de tendências e projeções
  - Agregação de dados (diária, semanal, mensal)

- **Sistema de Exportação Completo:**
  - Exportação para PDF (individual ou dashboard completo)
  - Exportação para PNG (individual ou dashboard completo)
  - Exportação para CSV com dados estruturados
  - Exportação para Excel com múltiplas abas
  - Preview antes da exportação

#### 🎨 Sistema de Temas Avançado
- **3 Modos de Tema:**
  - Modo Claro (Light)
  - Modo Escuro (Dark)
  - Modo Automático (segue preferência do sistema)
- **Transições Suaves** entre temas
- **Persistência** da preferência do usuário
- **Cores Dinâmicas** que se adaptam ao tema

#### 📱 Interface Responsiva e Interativa
- **Botão de Ação Flutuante (FAB):**
  - Acesso rápido a filtros
  - Acesso rápido à exportação
  - Atualização de dados
  - Configurações
  - Contador de filtros ativos

- **Lazy Loading Inteligente:**
  - Carregamento sob demanda dos gráficos
  - Preload automático após 1.5s
  - Preload no hover e focus
  - Skeleton loading durante carregamento

#### 🏥 Dashboard de Estatísticas da Clínica
- **Cards de Resumo:**
  - Total de Agendamentos
  - Total de Presenças (com taxa percentual)
  - Total de Faltas (com taxa percentual)
  - Total de Reagendamentos

- **Gráficos Especializados:**
  - Gráfico de Barras: Faltas por dia da semana
  - Gráfico de Pizza: Distribuição Presenças vs Faltas
  - Tabela de Agendamentos com dados detalhados

- **Modais Interativos:**
  - Modal de Presenças com lista detalhada
  - Modal de Faltas com análise temporal
  - Dados mockados realistas (200+ agendamentos)

#### 🎯 Modais Interativos para Todos os Gráficos
Cada gráfico possui um modal detalhado com:

- **Análises Estatísticas:**
  - Médias, medianas, desvios padrão
  - Correlações e tendências
  - Insights e recomendações

- **Visualizações Adicionais:**
  - Gráficos complementares
  - Tabelas de dados detalhadas
  - Métricas de performance

- **Dados Estruturados:**
  - Exportação individual do modal
  - Filtros específicos por modal
  - Navegação intuitiva

### 🎨 Características de Design

- **Tema Moderno:** Paleta de cores customizada com gradientes
- **Animações Suaves:** Efeitos de fade-in, float e transições CSS
- **Responsividade Total:** Layout adaptável para desktop, tablet e mobile
- **Efeitos de Hover:** Cards elevam e destacam ao passar o mouse
- **UI Consistente:** Sistema de design unificado usando Material-UI
- **Error Boundaries:** Tratamento elegante de erros com fallbacks
- **Bundle Analyzer:** Análise de performance em desenvolvimento
- **Skeleton Loading:** Estados de carregamento elegantes
- **Transições de Tema:** Animações suaves entre modos claro/escuro

## 🛠️ Tecnologias Utilizadas

- **React 19.1.1** - Framework principal
- **TypeScript 5.9.3** - Type safety e desenvolvimento robusto
- **Vite 7.1.14** (rolldown-vite) - Build tool ultra-rápido
- **Material-UI (MUI) 7.3.4** - Sistema de componentes UI
- **MUI X Charts 8.15.0** - Biblioteca de visualizações de dados
- **MUI X Date Pickers 8.16.0** - Componentes de seleção de data
- **Emotion** - CSS-in-JS para estilização
- **html2canvas** - Captura de elementos para exportação
- **jsPDF** - Geração de documentos PDF
- **file-saver** - Download de arquivos
- **date-fns** - Manipulação de datas
- **ESLint** - Qualidade e padronização de código

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
│   │   ├── charts/
│   │   │   └── index.tsx          # Exportações centralizadas dos gráficos
│   │   ├── AreaChart.tsx          # Gráfico de área
│   │   ├── AreaChartModal.tsx     # Modal do gráfico de área
│   │   ├── BarChart.tsx           # Gráfico de barras
│   │   ├── BarChartModal.tsx      # Modal do gráfico de barras
│   │   ├── ClinicStats.tsx        # Dashboard de estatísticas da clínica
│   │   ├── FunnelChart.tsx        # Gráfico de funil
│   │   ├── FunnelChartModal.tsx   # Modal do gráfico de funil
│   │   ├── GaugeChart.tsx         # Gráfico gauge
│   │   ├── GaugeChartModal.tsx    # Modal do gráfico gauge
│   │   ├── LineChart.tsx          # Gráfico de linha
│   │   ├── LineChartModal.tsx     # Modal do gráfico de linha
│   │   ├── PieChart.tsx           # Gráfico de pizza (com interatividade)
│   │   ├── PieChartModal.tsx      # Modal detalhado do gráfico de pizza
│   │   ├── RadarChart.tsx         # Gráfico radar
│   │   ├── RadarChartModal.tsx    # Modal do gráfico radar
│   │   ├── ScatterChart.tsx       # Gráfico de dispersão
│   │   ├── ScatterChartModal.tsx  # Modal do gráfico de dispersão
│   │   ├── SparklineChart.tsx     # Gráfico sparkline
│   │   ├── SparklineChartModal.tsx # Modal do gráfico sparkline
│   │   ├── Toolbar.tsx            # Barra de ferramentas principal
│   │   ├── FilterPanel.tsx        # Painel de filtros
│   │   ├── ExportPanel.tsx        # Painel de exportação
│   │   ├── FloatingActionButton.tsx # Botão de ação flutuante
│   │   ├── LazyChartWrapper.tsx   # Wrapper para lazy loading
│   │   ├── SkeletonChart.tsx      # Componente de skeleton loading
│   │   ├── ErrorBoundary.tsx      # Tratamento de erros
│   │   ├── BundleAnalyzer.tsx     # Análise de bundle
│   │   ├── AnimatedThemeToggle.tsx # Toggle de tema animado
│   │   ├── ThemeTransition.tsx    # Transições de tema
│   │   ├── AgendamentosTable.tsx  # Tabela de agendamentos
│   │   ├── PresencasModal.tsx     # Modal de presenças
│   │   └── ProfissionalModal.tsx  # Modal de profissionais
│   ├── contexts/
│   │   └── DashboardContext.tsx   # Context para estado global
│   ├── hooks/
│   │   ├── useLazyCharts.ts       # Hook para lazy loading
│   │   ├── useLoading.ts          # Hook para estados de loading
│   │   ├── useTheme.ts            # Hook para temas
│   │   ├── useThemeMode.ts        # Hook para modo de tema
│   │   ├── useThemeSounds.ts      # Hook para sons de tema
│   │   └── useExport.ts           # Hook para exportação
│   ├── App.tsx                    # Componente principal do dashboard
│   ├── App.css                    # Estilos do App
│   ├── index.css                  # Estilos globais
│   └── main.tsx                   # Ponto de entrada da aplicação
├── public/                        # Arquivos estáticos
├── dist/                          # Build de produção
├── package.json
├── tsconfig.json                  # Configuração TypeScript
├── vite.config.ts                 # Configuração Vite
├── eslint.config.js               # Configuração ESLint
├── create_release.py              # Script de criação de release
├── create-release.sh              # Script shell de release
├── RELEASE_NOTES.md               # Notas de release
└── RELEASE_BODY.md                # Corpo da release
```

## 🎯 Uso

O dashboard é totalmente funcional e demonstra cada tipo de gráfico com dados de exemplo. Você pode:

### 📊 Dashboard Principal
1. **Visualizar** todos os 9 tipos de gráficos organizados por categorias
2. **Interagir** com qualquer gráfico clicando para abrir modais detalhados
3. **Filtrar** dados usando a barra de ferramentas avançada
4. **Exportar** gráficos individuais ou o dashboard completo
5. **Alternar** entre temas claro, escuro e automático

### 🏥 Dashboard da Clínica
1. **Analisar** estatísticas de agendamentos médicos
2. **Visualizar** distribuição de presenças e faltas
3. **Explorar** dados detalhados em tabelas interativas
4. **Investigar** padrões de faltas por dia da semana

### 🔧 Funcionalidades Avançadas
1. **Usar** o botão flutuante para acesso rápido às ferramentas
2. **Aproveitar** o lazy loading para performance otimizada
3. **Personalizar** a experiência com filtros e configurações
4. **Exportar** dados em múltiplos formatos (PDF, PNG, CSV, Excel)

## 🔧 Customização

### Modificando Dados dos Gráficos

Cada componente de gráfico possui dados mockados que podem ser facilmente substituídos. Por exemplo, em `LineChart.tsx`:

```typescript
const data: SeriesData[] = [
  { id: 'vendas', label: 'Vendas', data: [120, 145, 138, 162, 178, 195, 210] },
  { id: 'receita', label: 'Receita', data: [80, 95, 110, 125, 140, 155, 170] },
];
```

### Alterando Cores e Temas

As cores podem ser customizadas através do tema do Material-UI em `App.tsx` ou diretamente nas props `colors` de cada gráfico. O sistema de temas suporta:

- **Cores Primárias e Secundárias**
- **Cores de Background e Texto**
- **Cores de Gráficos Dinâmicas**
- **Gradientes Personalizados**

### Adicionando Novos Gráficos

1. Crie um novo componente em `src/components/`
2. Crie o modal correspondente em `src/components/`
3. Adicione as exportações em `src/components/charts/index.tsx`
4. Importe e adicione no `App.tsx`
5. Ajuste o layout do Grid conforme necessário

### Configurando Filtros

Os filtros podem ser personalizados em `FilterPanel.tsx`:

```typescript
const filterOptions = {
  period: ['last30days', 'last3months', 'last6months', 'lastYear'],
  categories: ['vendas', 'receita', 'usuarios'],
  dataTypes: ['numerico', 'categorico'],
  // ... mais opções
};
```

### Personalizando Exportação

As opções de exportação podem ser modificadas em `ExportPanel.tsx` e `useExport.ts`:

```typescript
const exportFormats = ['PDF', 'PNG', 'CSV', 'Excel'];
const exportOptions = {
  quality: 0.92,
  format: 'A4',
  orientation: 'landscape'
};
```

## 📱 Responsividade

O dashboard utiliza o sistema de Grid do Material-UI para garantir que todos os gráficos sejam exibidos corretamente em diferentes tamanhos de tela:

- **Desktop (1200px+):** Layout em 2 colunas para gráficos menores, 1 coluna para gráficos grandes
- **Tablet (768px-1199px):** Layout adaptativo mantendo a legibilidade e usabilidade
- **Mobile (até 767px):** Gráficos em coluna única para melhor visualização
- **Breakpoints Inteligentes:** Ajuste automático baseado no conteúdo e espaço disponível
- **Touch-Friendly:** Interface otimizada para interação touch em dispositivos móveis

## 🎨 Paleta de Cores

O projeto utiliza uma paleta moderna e consistente:

### 🎯 Cores Principais
- **Primary:** `#6366f1` (Índigo) - Cor principal do tema
- **Secondary:** `#ec4899` (Rosa) - Cor secundária e de destaque
- **Success:** `#34d399` (Verde) - Indicadores de sucesso
- **Warning:** `#fbbf24` (Amarelo) - Avisos e alertas
- **Info:** `#60a5fa` (Azul) - Informações e links

### 🌙 Modo Escuro
- **Background:** `#0f172a` (Azul escuro)
- **Paper:** `#1e293b` (Cinza escuro)
- **Text Primary:** `#f1f5f9` (Branco suave)
- **Text Secondary:** `#94a3b8` (Cinza claro)

### ☀️ Modo Claro
- **Background:** `#f8fafc` (Branco suave)
- **Paper:** `#ffffff` (Branco)
- **Text Primary:** `#1e293b` (Azul escuro)
- **Text Secondary:** `#64748b` (Cinza médio)

### 🎨 Cores dos Gráficos
- **Série 1:** `#818cf8` (Índigo claro)
- **Série 2:** `#f472b6` (Rosa claro)
- **Série 3:** `#34d399` (Verde claro)
- **Série 4:** `#fbbf24` (Amarelo claro)
- **Série 5:** `#60a5fa` (Azul claro)

## 🚀 Performance

### ⚡ Otimizações Implementadas
- **Lazy Loading:** Carregamento sob demanda dos gráficos
- **Code Splitting:** Divisão automática do código em chunks
- **Memoização:** Uso de `React.memo` e `useMemo` para evitar re-renders
- **Bundle Analysis:** Análise contínua do tamanho do bundle
- **Tree Shaking:** Eliminação de código não utilizado
- **Vite (Rolldown):** Build tool ultra-rápido com bundling otimizado

### 📊 Métricas de Performance
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3s
- **Bundle Size:** Otimizado para < 500KB gzipped

## 📄 Licença

Este projeto é uma demonstração educacional. Sinta-se livre para usar e modificar conforme necessário.

## 🙏 Agradecimentos

- **Material-UI** por fornecer componentes incríveis e sistema de design consistente
- **MUI X Charts** pela excelente biblioteca de visualizações de dados
- **Vite** pela ferramenta de build ultra-rápida
- **Comunidade React** pelo suporte contínuo e inovações
- **TypeScript** por tornar o desenvolvimento mais robusto e escalável

## 🔗 Links Úteis

- **Demo Online:** [https://caarlosandree.github.io/dash-demo/](https://caarlosandree.github.io/dash-demo/)
- **Material-UI:** [https://mui.com/](https://mui.com/)
- **MUI X Charts:** [https://mui.com/x/react-charts/](https://mui.com/x/react-charts/)
- **Vite:** [https://vitejs.dev/](https://vitejs.dev/)

---

**Desenvolvido com ❤️ usando React + TypeScript + Material-UI + Vite**
