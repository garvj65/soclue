import Link from "next/link";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";

export default async function LandingPage() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If already logged in, skip landing
  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">
        {/* Brand */}
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          SoClue
        </h1>

        <p className="text-gray-600 mb-8">
          A Clueso-inspired platform to collect feedback, generate insights,
          and iterate on your product content with confidence.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          <Link
            href="/signup"
            className="rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="rounded-md border border-gray-400 px-6 py-3 text-sm text-gray-900 font-medium hover:bg-gray-100"
          >
            Log In
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="grid gap-4 text-left md:grid-cols-3 text-gray-900">
          <Feature
            title="Project-Based Workflow"
            description="Organize content, feedback, and insights around clear project units."
          />
          <Feature
            title="Feedback → Insights"
            description="Collect structured feedback and generate actionable insights."
          />
          <Feature
            title="Secure by Design"
            description="Row-level security ensures users only access their own data."
          />
        </div>
      </div>
    </main>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
