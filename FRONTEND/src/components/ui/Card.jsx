export default function Card({ children, className = "" }) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-surface p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
