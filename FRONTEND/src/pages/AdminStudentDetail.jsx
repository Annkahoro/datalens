import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api, { getErrorMessage } from "../api/client";
import Card from "../components/ui/Card";
import Textarea from "../components/ui/Textarea";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import Badge from "../components/ui/Badge";

export default function AdminStudentDetail() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadStudent = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/students/${id}`);
      setStudent(res.data.student);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!comment.trim()) return;

    setSubmitting(true);
    try {
      const res = await api.post(`/admin/students/${id}/reviews`, { comment });
      setStudent(res.data.student);
      setComment("");
      setSuccess("Review added.");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="px-6 py-10 text-center text-slate-500">Loading student...</div>;
  }

  if (!student) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Alert variant="error">{error || "Student not found."}</Alert>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link to="/admin" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
        &larr; Back to students
      </Link>

      <div className="mt-4 grid gap-6 md:grid-cols-[1fr_1.2fr]">
        <Card>
          <h1 className="text-xl font-bold text-slate-900">{student.name}</h1>
          <p className="text-sm text-slate-500">{student.email}</p>

          <dl className="mt-5 flex flex-col gap-3 text-sm">
            <div>
              <dt className="text-slate-400">School</dt>
              <dd className="font-medium text-slate-700">{student.school || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Course</dt>
              <dd className="font-medium text-slate-700">{student.course || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Grades</dt>
              <dd className="font-medium text-slate-700">{student.grades || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Hobbies</dt>
              <dd className="mt-1 flex flex-wrap gap-1.5">
                {student.hobbies?.length
                  ? student.hobbies.map((hobby) => <Badge key={hobby} variant="brand">{hobby}</Badge>)
                  : <span className="font-medium text-slate-700">—</span>}
              </dd>
            </div>
            <div>
              <dt className="text-slate-400">Bio</dt>
              <dd className="font-medium text-slate-700">{student.bio || "—"}</dd>
            </div>
          </dl>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <h2 className="text-lg font-bold text-slate-900">Add a review</h2>
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
              <Alert variant="error">{error}</Alert>
              <Alert variant="success">{success}</Alert>
              <Textarea
                id="comment"
                rows={3}
                placeholder="Write feedback for this student..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
              <Button type="submit" variant="success" disabled={submitting} className="self-start">
                {submitting ? "Submitting..." : "Submit review"}
              </Button>
            </form>
          </Card>

          <Card>
            <h2 className="text-lg font-bold text-slate-900">Review history</h2>
            <div className="mt-4 flex flex-col gap-3">
              {student.reviews.length === 0 && (
                <p className="text-sm text-slate-400">No reviews yet.</p>
              )}
              {student.reviews
                .slice()
                .reverse()
                .map((review) => (
                  <div key={review._id} className="rounded-lg border border-slate-200 p-3">
                    <span className="text-xs text-slate-400">
                      {new Date(review.createdAt).toLocaleString()}
                    </span>
                    <p className="mt-1 text-sm text-slate-700">{review.comment}</p>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
