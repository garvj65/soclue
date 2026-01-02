"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createProject } from "@/lib/projects";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function NewProjectPage() {
  const router = useRouter();
  const supabase = supabaseBrowser();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await createProject(title, description, user.id);

    router.push("/dashboard");
  };

  return (
    <div className="p-6 border-black">
      <div className="mx-auto max-w-xl rounded-lg border bg-white p-6">
        <h1 className="mb-4 text-xl font-bold text-gray-800">Create New Project</h1>
        <p className="mb-6 text-sm text-gray-800">
          Create a new project to start collecting feedback and insights.
        </p>

        <form onSubmit={handleCreate} className="space-y-4 text-gray-500">
        <input
          required
          placeholder="Project title"
          className="w-full border px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full border px-3 py-2 text-gray-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          disabled={loading}
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
      </div>
    </div>
  );
}
