"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

type Props = {
  mode: "login" | "signup";
};

export default function AuthForm({ mode }: Props) {
  const supabase = supabaseBrowser();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const response =
      mode === "signup"
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (response.error) {
      setError(response.error.message);
      return;
    }

    router.refresh(); // 🔥 forces server to re-read session
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-xl font-semibold capitalize">{mode}</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border px-3 py-2"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full border px-3 py-2"
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        disabled={loading}
        className="w-full bg-black text-white py-2"
      >
        {loading ? "Loading..." : mode === "signup" ? "Sign up" : "Log in"}
      </button>
    </form>
  );
}
