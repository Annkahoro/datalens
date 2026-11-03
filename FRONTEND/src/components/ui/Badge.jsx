const variants = {
  success: "bg-success-50 text-success-700",
  brand: "bg-brand-50 text-brand-700",
  neutral: "bg-slate-100 text-slate-600",
};

export default function Badge({ children, variant = "neutral" }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
}
