import { useEffect, useState } from "react";
import api, { getErrorMessage } from "../api/client";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import Badge from "../components/ui/Badge";

const emptyForm = { school: "", course: "", grades: "", hobbies: "", bio: "" };

export default function StudentDashboard() {
  const [form, setForm] = useState(emptyForm);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadProfile = async () => {
    setLoading(true);
    try {
      const res = await api.get("/profile");
      const profile = res.data.profile;
      setForm({
        school: profile.school || "",
        course: profile.course || "",
        grades: profile.grades || "",
        hobbies: (profile.hobbies || []).join(", "),
        bio: profile.bio || "",
      });
      setReviews(profile.reviews || []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      const payload = {
        ...form,
        hobbies: form.hobbies
          .split(",")
          .map((h) => h.trim())
          .filter(Boolean),
      };
      const res = await api.put("/profile", payload);
      setReviews(res.data.profile.reviews || []);
      setSuccess("Profile saved successfully.");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="px-6 py-10 text-center text-slate-500">Loading your profile...</div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-bold text-slate-900">My profile</h1>
      <p className="mt-1 text-sm text-slate-500">
        Keep your information up to date so the admin can give you useful feedback.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-[1.3fr_1fr]">
        <Card>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Alert variant="error">{error}</Alert>
            <Alert variant="success">{success}</Alert>

            <Input
              id="school"
              name="school"
              label="School"
              placeholder="e.g. Nairobi High School"
              value={form.school}
              onChange={handleChange}
            />
            <Input
              id="course"
              name="course"
              label="Course / field of study"
              placeholder="e.g. Computer Science"
              value={form.course}
              onChange={handleChange}
            />
            <Input
              id="grades"
              name="grades"
              label="Grades"
              placeholder="e.g. A-"
              value={form.grades}
              onChange={handleChange}
            />
            <Input
              id="hobbies"
              name="hobbies"
              label="Hobbies"
              placeholder="e.g. Reading, Football, Chess"
              value={form.hobbies}
              onChange={handleChange}
            />
            <Textarea
              id="bio"
              name="bio"
              label="Short bio"
              rows={4}
              placeholder="Tell us a bit about yourself..."
              value={form.bio}
              onChange={handleChange}
            />

            <Button type="submit" disabled={saving} className="mt-2 self-start">
              {saving ? "Saving..." : "Save profile"}
            </Button>
          </form>
        </Card>

        <Card>
          <h2 className="text-lg font-bold text-slate-900">Admin reviews</h2>
          <p className="mt-1 text-sm text-slate-500">Feedback left by the admin on your profile.</p>

          <div className="mt-4 flex flex-col gap-3">
            {reviews.length === 0 && (
              <p className="text-sm text-slate-400">No reviews yet.</p>
            )}
            {reviews
              .slice()
              .reverse()
              .map((review) => (
                <div key={review._id} className="rounded-lg border border-slate-200 p-3">
                  <div className="mb-1.5 flex items-center justify-between">
                    <Badge variant="success">Admin review</Badge>
                    <span className="text-xs text-slate-400">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700">{review.comment}</p>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
