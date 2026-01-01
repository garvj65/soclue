"use client";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { useEffect, useState } from "react";
import { getProjects } from "@/lib/projects";

type Project = {
  id: string;
  title: string;
  description: string;
  status: string;
};

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await getProjects();
      if (data) setProjects(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-3">
          <Link
            href="/dashboard/new"
            className="rounded bg-black px-4 py-2 text-white"
          >
            + New Project
          </Link>
          <LogoutButton />
        </div>
      </div>

      {loading && <p>Loading projects...</p>}

      {!loading && projects.length === 0 && (
        <p className="text-gray-500">
          No projects yet. Create your first one.
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/dashboard/${project.id}`}
            className="rounded border p-4 hover:shadow"
          >
            <h2 className="font-semibold">{project.title}</h2>
            <p className="text-sm text-gray-600">{project.description}</p>
            <span className="mt-2 inline-block rounded bg-gray-100 px-2 py-1 text-xs">
              {project.status}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}