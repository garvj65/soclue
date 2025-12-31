import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
// Removed CookieOptions import as it is not exported

export default async function DashboardPage() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string) {
          const options = { path: '/' }; // Define options here
          cookieStore.set(name, value, options);
        },
        remove(name: string) {
          const options = { path: '/' }; // Define options here
          cookieStore.set(name, "", options);
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p>Unauthorized</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-600">Welcome, {user.email}</p>
    </div>
  );
}
