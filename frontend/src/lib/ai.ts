import { supabaseBrowser } from "@/lib/supabase-browser";

type InsightResult = {
  summary: string;
  key_points: string[];
  suggestions: string[];
};

const KEYWORDS = {
  onboarding: ["onboard", "signup", "start", "begin"],
  clarity: ["confusing", "unclear", "clarity", "hard"],
  ui: ["ui", "interface", "design", "layout"],
  performance: ["slow", "lag", "performance", "delay"],
  feedback: ["feedback", "response", "communication"],
};

function extractThemes(messages: string[]) {
  const counts: Record<string, number> = {};

  for (const msg of messages) {
    const lower = msg.toLowerCase();
    for (const [theme, words] of Object.entries(KEYWORDS)) {
      if (words.some((w) => lower.includes(w))) {
        counts[theme] = (counts[theme] || 0) + 1;
      }
    }
  }

  return counts;
}

function generateSummary(count: number) {
  if (count === 0) {
    return "No feedback available to generate insights.";
  }
  if (count < 3) {
    return "Limited feedback has been provided. Early trends are emerging.";
  }
  if (count < 6) {
    return "Moderate feedback volume reveals consistent user themes.";
  }
  return "High feedback volume indicates strong engagement and clear patterns.";
}

function generateSuggestions(themes: Record<string, number>) {
  const suggestions: string[] = [];

  if (themes.onboarding)
    suggestions.push("Improve onboarding with clearer guidance or walkthroughs.");

  if (themes.clarity)
    suggestions.push("Clarify confusing areas based on user feedback.");

  if (themes.ui)
    suggestions.push("Refine UI layout and visual hierarchy.");

  if (themes.performance)
    suggestions.push("Investigate performance or responsiveness issues.");

  if (suggestions.length === 0)
    suggestions.push("Continue collecting feedback to uncover actionable insights.");

  return suggestions;
}

export async function generateInsights(
  projectId: string,
  feedbackMessages: string[]
): Promise<InsightResult> {
  // Simulate processing time
  await new Promise((res) => setTimeout(res, 500));

  const themes = extractThemes(feedbackMessages);
  const sortedThemes = Object.entries(themes)
    .sort((a, b) => b[1] - a[1])
    .map(([theme, count]) => `${theme} (${count})`);

  return {
    summary: generateSummary(feedbackMessages.length),
    key_points:
      sortedThemes.length > 0
        ? sortedThemes
        : ["No dominant themes detected"],
    suggestions: generateSuggestions(themes),
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
