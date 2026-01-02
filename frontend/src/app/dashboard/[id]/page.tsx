"use client";
import { use, useEffect, useState } from "react";
import { generateInsights, getInsights, saveInsights } from "@/lib/ai";
import { addFeedback, getFeedback } from "@/lib/feedback";
import { getProjectById } from "@/lib/projects";
import { supabaseBrowser } from "@/lib/supabase-browser";

type Feedback = {
  id: string;
  message: string;
  created_at: string;
};

type Project = {
  id: string;
  title: string;
  description: string;
  status: string;
};

type Insights = {
  summary: string;
  key_points: string[];
  suggestions: string[];
};

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const supabase = supabaseBrowser();

  const [project, setProject] = useState<Project | null>(null);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<Insights | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: projectData } = await getProjectById(id);
      const { data: feedbackData } = await getFeedback(id);
      const { data: insightData } = await getInsights(id);

      setProject(projectData);
      setFeedback(feedbackData || []);
      setInsights(insightData);
    }
    load();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !message.trim()) {
      setLoading(false);
      return;
    }

    await addFeedback(id, user.id, message);
    setMessage("");

    const { data } = await getFeedback(id);
    setFeedback(data || []);
    setLoading(false);
  };

  const handleGenerateInsights = async () => {
    setAiLoading(true);

    const messages = feedback.map((f) => f.message);
    const aiResult = await generateInsights(id, messages);

    await saveInsights(id, aiResult);

    const { data } = await getInsights(id);
    setInsights(data);

    setAiLoading(false);
  };

  if (!project) return <p className="p-6">Loading project...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Project Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{project.title}</h1>
        <p className="text-gray-600">{project.description}</p>
        <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              {project.status}
        </span>
      </div>

      {/* Feedback Section */}
      <div className="border-t pt-6">
        <h2 className="mb-4 text-lg font-semibold">Feedback</h2>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="mb-6 space-y-3">
          <textarea
            placeholder="Add feedback..."
            className="w-full rounded border px-3 py-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            required
          />

          <button
            disabled={loading}
            className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800 active:bg-gray-900"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>

        {/* Feedback List */}
        {feedback.length === 0 && (
          <p className="text-sm text-gray-500">
            No feedback yet.
          </p>
        )}

        <ul className="space-y-3">
          {feedback.map((item) => (
            <li
              key={item.id}
              className="rounded border bg-gray-50 p-3 text-sm text-black"
            >
              {item.message}
              <div className="mt-1 text-xs text-gray-600">
                {new Date(item.created_at).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* AI Insights Section */}
      <div className="mt-10 border-t pt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">AI Insights</h2>
          <button
            onClick={handleGenerateInsights}
            disabled={aiLoading}
            className="rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
          >
            {aiLoading ? "Generating..." : "Generate Insights"}
          </button>
        </div>

        {!insights && (
          <p className="text-sm text-gray-500">
            No insights generated yet.
          </p>
        )}

        {insights && (
          <div className="space-y-4 rounded border bg-gray-50 p-4">
            <div>
              <h3 className="font-medium">Summary</h3>
              <p className="text-sm text-gray-700">
                {insights.summary}
              </p>
            </div>

            <div>
              <h3 className="font-medium">Key Points</h3>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {insights.key_points.map((point: string, i: number) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium">Suggestions</h3>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {insights.suggestions.map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
