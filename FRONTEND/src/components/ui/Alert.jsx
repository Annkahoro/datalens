const variants = {
  success: "bg-success-50 text-success-700 border-success-100",
  error: "bg-danger-50 text-danger-700 border-danger-100",
};

export default function Alert({ variant = "error", children }) {
  if (!children) return null;

  return (
    <div className={`rounded-lg border px-4 py-3 text-sm font-medium ${variants[variant]}`}>
      {children}
    </div>
  );
}
