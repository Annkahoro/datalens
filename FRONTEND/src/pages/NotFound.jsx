import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center gap-2 text-center">
      <h1 className="text-3xl font-bold text-slate-900">404</h1>
      <p className="text-slate-500">This page doesn't exist.</p>
      <Link to="/" className="mt-2 font-semibold text-brand-600 hover:text-brand-700">
        Go home
      </Link>
    </div>
  );
}
