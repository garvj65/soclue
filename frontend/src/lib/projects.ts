import { supabaseBrowser } from "@/lib/supabase-browser";

export async function getProjects() {
  const supabase = supabaseBrowser();
  return supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });
}

export async function createProject(
  title: string,
  description: string,
  userId: string
) {
  const supabase = supabaseBrowser();
  return supabase.from("projects").insert({
    title,
    description,
    user_id: userId,
  });
}

export async function getProjectById(id: string) {
  const supabase = supabaseBrowser();
  return supabase.from("projects").select("*").eq("id", id).single();
}
