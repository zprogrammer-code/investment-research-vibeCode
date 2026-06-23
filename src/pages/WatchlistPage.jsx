import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

// 1. Defined Tracked Tickers
const TICKERS = [
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 178.45, change: 1.24, isPositive: true },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 420.12, change: -0.85, isPositive: false },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 185.30, change: 2.11, isPositive: true },
  { symbol: 'MU', name: 'Micron Technology', price: 112.50, change: 4.62, isPositive: true },
  { symbol: 'HSAI', name: 'Hesai Group', price: 4.85, change: -1.20, isPositive: false },
  { symbol: 'INVZ', name: 'Innoviz Technologies', price: 1.15, change: 0.00, isPositive: true },
  { symbol: 'VXRT', name: 'Vaxart, Inc.', price: 0.82, change: -3.45, isPositive: false },
  { symbol: 'INTC', name: 'Intel Corp.', price: 30.25, change: 0.55, isPositive: true },
];

const TIME_HORIZONS = ['1D', '5D', '1M', '6M', '1Y', '5Y'];

export default function WatchlistPage() {
  const [selectedTicker, setSelectedTicker] = useState(TICKERS[0]);
  const [timeHorizon, setTimeHorizon] = useState('1M');

  // 2. Dynamic Mock Data Generator to Simulate Yahoo Finance
  const chartData = useMemo(() => {
    let dataPoints = 20;
    if (timeHorizon === '1D') dataPoints = 12;
    if (timeHorizon === '5D') dataPoints = 15;
    if (timeHorizon === '6M') dataPoints = 30;
    if (timeHorizon === '5Y') dataPoints = 50;

    const basePrice = selectedTicker.price;
    const points = [];
    let currentPrice = basePrice * (1 - (selectedTicker.change / 100));

    for (let i = 0; i < dataPoints; i++) {
      const percentInterval = i / (dataPoints - 1);
      // Create a realistic random walk targeting the current closing price
      const randomShock = (Math.random() - 0.48) * (basePrice * 0.02);
      currentPrice = currentPrice + randomShock;
      
      // Smooth out toward final price at the edge
      if (i === dataPoints - 1) currentPrice = basePrice;

      let label = `${i + 1}`;
      if (timeHorizon === '1D') label = `${9 + Math.floor(i/2)}:${i % 2 === 0 ? '30' : '00'}`;
      if (timeHorizon === '1M') label = `Day ${i + 1}`;
      if (timeHorizon === '1Y') label = `Month ${Math.floor(i / 1.6) + 1}`;

      points.push({
        label,
        Value: parseFloat(currentPrice.toFixed(2)),
      });
    }
    return points;
  }, [selectedTicker, timeHorizon]);

  // Determine line colors based on ticker performance
  const chartColor = selectedTicker.change >= 0 ? '#10b981' : '#ef4444';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      <header className="border-b border-slate-900 bg-slate-900/80 px-4 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            to="/"
            className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm font-medium text-slate-200 transition hover:border-emerald-500/50 hover:text-white"
          >
            ← Home
          </Link>
          <div className="text-xs text-slate-500 font-mono">FINANCIAL CORE ENGINE v1.1</div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Watchlist Analytics</h1>
          <p className="mt-2 text-sm text-slate-400">
            Interactive macro tracking and performance monitoring for portfolio core dependencies.
          </p>
        </div>

        {/* Dashboard Frame Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: Ticker Watchlist Sidebar */}
          <div className="lg:col-span-4 space-y-2 max-h-[600px] overflow-y-auto pr-1 border-r border-slate-900/50">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 mb-3">Tracked Assets</h2>
            {TICKERS.map((ticker) => {
              const isActive = selectedTicker.symbol === ticker.symbol;
              return (
                <button
                  key={ticker.symbol}
                  onClick={() => setSelectedTicker(ticker)}
                  className={`w-full text-left flex items-center justify-between p-3 rounded-xl transition ${
                    isActive 
                      ? 'bg-slate-900 border border-slate-800 shadow-md ring-1 ring-slate-800' 
                      : 'bg-transparent border border-transparent hover:bg-slate-900/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm tracking-wide text-white">{ticker.symbol}</span>
                      <span className="text-xs text-slate-400 truncate max-w-[120px]">{ticker.name}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-semibold text-sm text-slate-100">${ticker.price.toFixed(2)}</div>
                    <div className={`flex items-center justify-end text-xs font-medium font-mono ${ticker.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {ticker.isPositive ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                      {ticker.change >= 0 ? '+' : ''}{ticker.change}%
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Simplified Interactive Yahoo Graph Workspace */}
          <div className="lg:col-span-8 bg-slate-900/40 border border-slate-900 rounded-2xl p-6 flex flex-col justify-between">
            
            {/* Active Ticker Meta Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-2xl font-mono font-bold text-white tracking-tight">{selectedTicker.symbol}</h2>
                  <span className="text-sm text-slate-400">{selectedTicker.name}</span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-3xl font-mono font-bold text-white tracking-tight">${selectedTicker.price.toFixed(2)}</span>
                  <span className={`flex items-center text-sm font-semibold font-mono ${selectedTicker.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {selectedTicker.change >= 0 ? '+' : ''}{selectedTicker.change}%
                  </span>
                </div>
              </div>

              {/* Interval Filters */}
              <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-900 self-start sm:self-center">
                {TIME_HORIZONS.map((horizon) => (
                  <button
                    key={horizon}
                    onClick={() => setTimeHorizon(horizon)}
                    className={`px-3 py-1 text-xs font-mono font-bold rounded-md transition ${
                      timeHorizon === horizon
                        ? 'bg-slate-900 text-white shadow-sm border border-slate-800'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {horizon}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom SVG Line Simulation Canvas */}
            <div className="h-64 my-6 relative flex items-end">
              {/* Horizontal Grid Rails */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-25">
                <div className="border-b border-dashed border-slate-800 w-full h-0"></div>
                <div className="border-b border-dashed border-slate-800 w-full h-0"></div>
                <div className="border-b border-dashed border-slate-800 w-full h-0"></div>
                <div className="border-b border-dashed border-slate-800 w-full h-0"></div>
              </div>

              {/* Dynamic Simulated Interactive Data Line */}
              <svg className="w-full h-full overflow-visible z-10">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chartColor} stopOpacity="0.15" />
                    <stop offset="100%" stopColor={chartColor} stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <polyline
                  fill="url(#chartGradient)"
                  stroke="none"
                  points={`
                    0,256
                    ${chartData.map((d, i) => {
                      const x = (i / (chartData.length - 1)) * 680;
                      const maxVal = Math.max(...chartData.map(p => p.Value));
                      const minVal = Math.min(...chartData.map(p => p.Value));
                      const range = maxVal - minVal || 1;
                      const y = 220 - ((d.Value - minVal) / range) * 180;
                      return `${x},${y}`;
                    }).join(' ')}
                    680,256
                  `}
                />
                <polyline
                  fill="none"
                  stroke={chartColor}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={chartData.map((d, i) => {
                    // Normalize mapping paths dynamically to container scale boundaries
                    const x = (i / (chartData.length - 1)) * 680;
                    const maxVal = Math.max(...chartData.map(p => p.Value));
                    const minVal = Math.min(...chartData.map(p => p.Value));
                    const range = maxVal - minVal || 1;
                    const y = 220 - ((d.Value - minVal) / range) * 180;
                    return `${x},${y}`;
                  }).join(' ')}
                />
              </svg>
            </div>

            {/* Micro-Notes Summary Card */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-900">
              <h3 className="text-xs font-bold font-mono uppercase text-slate-500 tracking-wider">Research Notebook Sync</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Displaying localized structural models. Data processing pipelines mapped to active NotebookLM document fragments. Select an operational ticker to view linked 10-K parameters.
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}