import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import AuthBackground from "@/components/ui/auth/AuthBackground";
import AuthCard from "@/components/ui/auth/AuthCard";
import LoginForm from "@/components/ui/auth/LoginForm";

export default async function LoginPage() {

  const supabase = await createClient();
  
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if(user) {
    redirect("/dashboard");
  }

  
  return (

    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-6 text-white">

      <AuthBackground />

      <AuthCard
        title="Welcome Back"
        subtitle="Continue your learning journey"
      >

      <LoginForm />

      </AuthCard>

    </main>
  )
}