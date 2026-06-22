export default function MetricCell({ label, value, valueClassName = 'text-white' }) {
  return (
    <div className="rounded-lg border border-slate-800/80 bg-slate-950/50 px-3 py-2.5">
      <dt className="text-[10px] font-medium uppercase tracking-wider text-slate-500">{label}</dt>
      <dd className={`mt-0.5 font-mono font-semibold tabular-nums ${valueClassName}`}>{value}</dd>
    </div>
  );
}
