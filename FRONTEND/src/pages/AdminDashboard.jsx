import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { getErrorMessage } from "../api/client";
import Card from "../components/ui/Card";
import Alert from "../components/ui/Alert";
import Badge from "../components/ui/Badge";

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/admin/students")
      .then((res) => setStudents(res.data.students))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Students</h1>
      <p className="mt-1 text-sm text-slate-500">Review student profiles and leave feedback.</p>

      <div className="mt-6">
        <Alert variant="error">{error}</Alert>
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-slate-500">Loading students...</p>
      ) : students.length === 0 ? (
        <p className="mt-6 text-sm text-slate-400">No students have registered yet.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {students.map((student) => (
            <Link key={student.id} to={`/admin/students/${student.id}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-semibold text-slate-900">{student.name}</h2>
                    <p className="text-sm text-slate-500">{student.email}</p>
                  </div>
                  <Badge variant={student.reviews.length > 0 ? "success" : "neutral"}>
                    {student.reviews.length} review{student.reviews.length === 1 ? "" : "s"}
                  </Badge>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <dt className="text-slate-400">School</dt>
                    <dd className="text-slate-700">{student.school || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Course</dt>
                    <dd className="text-slate-700">{student.course || "—"}</dd>
                  </div>
                </dl>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
