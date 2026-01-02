import AuthForm from "@/components/AuthForm";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="rounded-lg border bg-white p-6">
        <AuthForm mode="signup" />
      </div>
    </div>
  );
}
