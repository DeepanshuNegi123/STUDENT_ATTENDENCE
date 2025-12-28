// pbranch/pages/FeedbackPage.jsx
import { useState } from "react";
import { subjectAttendance } from "../data/attendanceData";
import { MessageCircle, Star, Tag } from "lucide-react";

const TAGS = ["Teaching", "Pace", "Doubts", "Assignments", "Exams", "Communication"];

const FeedbackPage = () => {
  const [selectedSubject, setSelectedSubject] = useState(subjectAttendance[0]?.code || "");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const [feedbacks, setFeedbacks] = useState([]);

  const maxChars = 400;

  const handleToggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSubject || rating === 0 || !comment.trim()) {
      alert("Please choose subject, rating and write some feedback.");
      return;
    }

    const subjectObj = subjectAttendance.find((s) => s.code === selectedSubject);

    setFeedbacks((prev) => {
      const filtered = prev.filter((f) => f.subjectCode !== selectedSubject);
      return [
        ...filtered,
        {
          subjectCode: selectedSubject,
          subjectName: subjectObj?.subject || selectedSubject,
          rating,
          comment: comment.trim(),
          anonymous,
          tags: selectedTags,
          status: "Submitted",
          date: new Date().toLocaleDateString(),
        },
      ];
    });

    alert("Thank you! Your feedback has been submitted.");
    setRating(0);
    setComment("");
    setAnonymous(false);
    setSelectedTags([]);
  };

  const subjectOptions = subjectAttendance.map((s) => ({
    code: s.code,
    name: s.subject,
  }));

  const ratingLabel =
    rating === 0
      ? "No rating selected"
      : rating === 1
      ? "Very Poor"
      : rating === 2
      ? "Needs Improvement"
      : rating === 3
      ? "Average"
      : rating === 4
      ? "Good"
      : "Excellent";

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Feedback</h1>
        <p className="text-sm text-gray-500 mt-1">
          Share your feedback for each subject and track how it is recorded.
        </p>
      </div>

      {/* Feedback form card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center shadow-md"
            style={{ background: "linear-gradient(135deg,#4f46e5,#6366f1)", color: "white" }}
          >
            <MessageCircle size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Submit Feedback</h2>
            <p className="text-xs text-gray-500">
              One feedback per subject. Submit again to update your previous feedback.
            </p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Subject select */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              >
                {subjectOptions.map((subj) => (
                  <option key={subj.code} value={subj.code}>
                    {subj.name} ({subj.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    className="p-1"
                  >
                    <Star
                      size={22}
                      style={{
                        color: value <= rating ? "#fbbf24" : "#d1d5db",
                        fill: value <= rating ? "#fbbf24" : "transparent",
                        transition: "transform 0.15s",
                      }}
                      className="hover:scale-110"
                    />
                  </button>
                ))}
                <span className="ml-2 text-xs text-gray-500">{ratingLabel}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What is this feedback about?
            </label>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleToggleTag(tag)}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs border transition-all ${
                      active
                        ? "border-transparent text-white"
                        : "border-gray-200 text-gray-600 hover:border-indigo-200"
                    }`}
                    style={
                      active
                        ? { backgroundColor: "#4f46e5" }
                        : { backgroundColor: "#f9fafb" }
                    }
                  >
                    <Tag size={12} />
                    <span>{tag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Feedback
            </label>
            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, maxChars))}
              placeholder="Share your feedback about teaching quality, pace, doubts, materials, etc."
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
            <div className="flex justify-end mt-1">
              <span className="text-xs text-gray-400">
                {comment.length}/{maxChars} characters
              </span>
            </div>
          </div>

          {/* Anonymous option */}
          <div className="flex items-center gap-2">
            <input
              id="anonymous"
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 focus:ring-indigo-500"
            />
            <label htmlFor="anonymous" className="text-sm text-gray-700">
              Submit anonymously
            </label>
          </div>

          {/* Submit button – force visible colors */}
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg text-sm font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1"
            style={{
              backgroundColor: "#4f46e5",
              color: "white",
              padding: "0.55rem 1.25rem",
            }}
          >
            Submit Feedback
          </button>
        </form>
      </div>

      {/* Feedback status section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-base font-bold text-gray-900 mb-4">Feedback Status</h2>

        {feedbacks.length === 0 ? (
          <p className="text-sm text-gray-500">
            No feedback submitted yet. Use the form above to submit feedback for each subject.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {feedbacks.map((fb) => (
              <div
                key={fb.subjectCode}
                className="border border-gray-100 rounded-xl p-4 hover:border-indigo-200 hover:shadow-sm transition-all"
              >
                <div className="flex justify-between items-start gap-2 mb-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {fb.subjectName} ({fb.subjectCode})
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {fb.date} • {fb.anonymous ? "Anonymous" : "Identified"}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
                    {fb.status}
                  </span>
                </div>

                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Star
                      key={v}
                      size={16}
                      style={{
                        color: v <= fb.rating ? "#fbbf24" : "#d1d5db",
                        fill: v <= fb.rating ? "#fbbf24" : "transparent",
                      }}
                    />
                  ))}
                  <span className="ml-1 text-xs text-gray-500">{fb.rating} / 5</span>
                </div>

                {fb.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {fb.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px]"
                        style={{ backgroundColor: "#eef2ff", color: "#4f46e5" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-xs text-gray-700 leading-snug mt-1">{fb.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;

