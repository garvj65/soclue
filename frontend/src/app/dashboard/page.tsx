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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-sm text-gray-500">
            Manage your projects and insights
          </p>
        </div>

        <Link
          href="/dashboard/new"
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + New Project
        </Link>
      </div>

      <div className="mb-6">
        <LogoutButton />
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
            className="rounded-lg border border-gray-200 bg-white p-5 transition hover:shadow-sm"
          >
            <h3 className="mb-1 font-semibold">{project.title}</h3>
            <p className="mb-3 text-sm text-gray-600 line-clamp-2">
              {project.description || "No description provided"}
            </p>
            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              {project.status}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}