import Link from "next/link";

export default function Navbar() {
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
            </div>
        </nav>
    )
}