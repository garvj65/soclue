import { supabaseBrowser } from "@/lib/supabase-browser";

export async function getFeedback(projectId: string) {
  const supabase = supabaseBrowser();
  return supabase
    .from("feedback")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });
}

export async function addFeedback(
  projectId: string,
  userId: string,
  message: string
) {
  const supabase = supabaseBrowser();
  return supabase.from("feedback").insert({
    project_id: projectId,
    user_id: userId,
    message,
  });
}
