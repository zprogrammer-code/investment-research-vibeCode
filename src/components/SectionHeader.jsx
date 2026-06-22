export default function SectionHeader({ id, subtitle, title, description, className = '' }) {
  return (
    <header className={`max-w-3xl ${className}`.trim()}>
      <p className="text-xs font-medium uppercase tracking-widest text-emerald-400">{subtitle}</p>
      <h2
        id={id}
        className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-2xl"
      >
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
    </header>
  );
}
