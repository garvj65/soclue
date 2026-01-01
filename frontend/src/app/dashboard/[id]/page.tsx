"use client";
import { use, useEffect, useState } from "react";
import { getProjectById } from "@/lib/projects";

interface Project {
  title: string;
  description: string;
  status: string;
}

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    async function load() {
      const { data } = await getProjectById(id);
      setProject(data);
    }
    load();
  }, [id]);

  if (!project) return <p className="p-6">Loading project...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{project.title}</h1>
      <p className="text-gray-600">{project.description}</p>
      <p className="mt-2 text-sm">Status: {project.status}</p>

      <div className="mt-8 border-t pt-6">
        <h2 className="text-lg font-semibold">Feedback</h2>
        <p className="text-gray-500 text-sm">
          Feedback section coming next.
        </p>
      </div>
    </div>
  );
}
