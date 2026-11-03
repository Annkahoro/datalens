const variants = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 disabled:bg-brand-100 disabled:text-brand-500",
  success: "bg-success-600 text-white hover:bg-success-700 disabled:bg-success-100 disabled:text-success-600",
  danger: "bg-danger-600 text-white hover:bg-danger-700 disabled:bg-danger-100 disabled:text-danger-600",
  ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
