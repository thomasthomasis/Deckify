"use client";

import { createClient } from "@/lib/supabase/client";

import Link from "next/link";

export default function Navbar() {

    async function handleLogout() {

        const supabase = createClient();
        await supabase.auth.signOut();

        window.location.href = "/";
    }

    return (
        <nav className="flex items-center justify-between py-6">

            <Link
                href="/dashboard"
                className="text-2xl font-bold"
            >
                Deckify
            </Link>

            <div className="flex gap-6 text-zinc-400">

                <Link href="/dashboard">
                    Dashboard
                </Link>

                <Link href="/profile">
                    Profile
                </Link>

                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    )
}