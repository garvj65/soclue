"use client";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = supabaseBrowser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();   // re-evaluate server session
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded border px-3 py-1 text-sm hover:bg-gray-100"
    >
      Log out
    </button>
  );
}
