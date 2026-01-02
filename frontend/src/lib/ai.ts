import { supabaseBrowser } from "@/lib/supabase-browser";

/**
 * Mock AI insights generator
 * In a real system, this would call an AI service.
 */
export async function generateInsights(
  projectId: string,
  feedback: string[]
) {
  // Simulate AI thinking time
  await new Promise((res) => setTimeout(res, 800));

  const summary =
    feedback.length === 0
      ? "Not enough feedback to generate insights."
      : "Users have shared actionable feedback regarding this project.";

  const keyPoints = feedback.slice(0, 3).map((msg) =>
    msg.length > 50 ? msg.slice(0, 50) + "..." : msg
  );

  const suggestions = [
    "Improve clarity based on feedback themes",
    "Address recurring concerns raised by users",
    "Iterate on project features incrementally",
  ];

  return {
    summary,
    key_points: keyPoints,
    suggestions,
  };
}

export async function saveInsights(
  projectId: string,
  insights: {
    summary: string;
    key_points: string[];
    suggestions: string[];
  }
) {
  const supabase = supabaseBrowser();
  return supabase.from("insights").insert({
    project_id: projectId,
    summary: insights.summary,
    key_points: insights.key_points,
    suggestions: insights.suggestions,
  });
}

export async function getInsights(projectId: string) {
  const supabase = supabaseBrowser();
  return supabase
    .from("insights")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();
}
