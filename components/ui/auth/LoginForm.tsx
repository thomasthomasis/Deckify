"use client";

import { redirectAfterAuth } from "@/lib/auth/redirectAfterAuth";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function login() {
        
        setLoading(true);
        setError("");

        const supabase=createClient();

        const {
            error
        } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if(error) {

            setError(error.message);
            
        } else{
            
            await redirectAfterAuth(router);
            router.refresh();
        }

        setLoading(false);
    }

    return (

        <form 
            onSubmit={(e) => {
                e.preventDefault();
                login();
            }}
            className="space-y-5">

            <input className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-emerald-500"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
            />

            <input className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-emerald-500"
                    required
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
            />

            {
                error &&
                <p className="text-sm text-red-400">
                    {error}
                </p>
            }

            <button type="submit" disabled={loading} className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-black transition hover:scale-[1.02] hover:bg-emerald-400 disabled:opacity-50">
                {
                    loading ? "Logging in..." : "Login"
                }
            </button>

            <p className="mt-6 text-center text-sm text-zinc-400">
                Don't have an account?{" "}

                <Link href="/signup" className="font-medium text-emerald-400 transition hover:text-emerald-300">
                    Create one
                </Link>
            </p>

        </form>
    )
}