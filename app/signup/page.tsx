import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import AuthBackground from "@/components/ui/auth/AuthBackground";
import AuthCard from "@/components/ui/auth/AuthCard";
import SignupForm from "@/components/ui/auth/SignupForm";

export default async function SignupPage() {

    const supabase = await createClient();

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if(user) {
        redirect("/dashboard");
    }

    return (

        <main className="relative flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
            
            <AuthBackground />
            <AuthCard title="Create your account" subtitle="Start learning smarter with AI">

                <SignupForm />
            </AuthCard>
        </main>
    )
}