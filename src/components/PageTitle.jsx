export default function PageTitle({ title, description }) {
  return (
    <>
      <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl text-slate-400">{description}</p>
      )}
    </>
  );
}
