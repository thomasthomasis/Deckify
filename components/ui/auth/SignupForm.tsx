"use client";

import { redirectAfterAuth } from "@/lib/auth/redirectAfterAuth";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupForm() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function signup() {

        setLoading(true);
        setError("");

        const supabase = createClient();

        const {
            error
        } = await supabase.auth.signUp({
            email,
            password,
        });

        if(error) {
            setError(error.message);
        }
        else {
            await redirectAfterAuth(router);
            router.refresh()
        }

        setLoading(false);


    }

    return (

        <form 
            onSubmit={(e) => {
                e.preventDefault();
                signup();
            }}
            className="space-y-5">

            <input className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-500"
                required
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-500"
                required
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {
                error && (
                    <p className="text-sm text-red-400">
                        {error}
                    </p>
                )
            }

            <button type="submit" disabled={loading} className="group relative w-full overflow-hidden rounded-xl bg-emerald-500 py-3 font-semibold text-black transition hover:scale-[1.02] hover:bg-emerald-400 active:scale-95 disabled:opacity-50">

                <span className="relative z-10">
                    {
                        loading ? "Creating account..." : "Create Account"
                    }
                </span>
            </button>

            <p className="mt-6 text-center text-sm text-zinc-400">
                Already have an account?{" "}

                <Link href="/login" className="font-medium text-emerald-400 transition hover:text-emerald-300">
                    Log in
                </Link>
            </p>   
        </form>
    )
}