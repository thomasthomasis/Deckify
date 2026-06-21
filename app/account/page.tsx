import Link from "next/link";


export default function AccountPage(){

return(

<main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">

<div className="mx-auto max-w-3xl">


<Link
href="/profile"
className="text-sm text-zinc-400 hover:text-white"
>
← Back to Profile
</Link>


<h1 className="mt-8 text-4xl font-bold">
Account Settings
</h1>


<div className="mt-8 rounded-3xl border border-red-500/20 bg-red-500/5 p-8">


<h2 className="text-xl font-bold">
Danger Zone
</h2>


<p className="mt-2 text-zinc-400">
Delete your account and all associated data.
</p>


<button className="mt-5 rounded-xl bg-red-500 px-5 py-3 font-semibold">
Delete Account
</button>


</div>


</div>

</main>

);

}