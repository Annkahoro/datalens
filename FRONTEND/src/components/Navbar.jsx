import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./ui/Button";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b border-slate-200 bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-bold text-brand-600">
          DataLens
        </Link>

        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">
              {user.name} <span className="text-slate-400">&middot;</span>{" "}
              <span className="capitalize">{user.role}</span>
            </span>
            <Button variant="ghost" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
