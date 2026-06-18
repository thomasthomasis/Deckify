import Navbar from "@/components/ui/Navbar";
import ContinueLearning from "@/components/ui/dashboard/ContinueLearning";
import CreateDeckCard from "@/components/ui/dashboard/CreateDeckCard";
import DashboardStats from "@/components/ui/dashboard/DashboardStats";
import DeckCard from "@/components/ui/dashboard/DeckCard";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage(){

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if(!user) {
        redirect("/login");
    }

return (

<main className="min-h-screen bg-zinc-950 text-white">
    <div className="mx-auto max-w-7xl px-8 pb-20">

<Navbar />



<section
className="
mt-12
"
>


<h1
className="
text-5xl
font-black
tracking-tight
"
>
Welcome back 👋
</h1>

<p className="mt-3 text-lg text-zinc-400">
    { user.email }
</p>


<p
className="
mt-3
text-lg
text-zinc-400
"
>
You have 18 cards waiting for review.
</p>



<DashboardStats />


</section>




<ContinueLearning />




<section
className="
mt-16
"
>


<div
className="
flex
items-center
justify-between
"
>


<h2
className="
text-3xl
font-bold
"
>
My Decks
</h2>



</div>




<div
className="
mt-8
grid
gap-6
md:grid-cols-2
lg:grid-cols-3
"
>


<DeckCard

id="1"

title="Biology Midterm"

due={18}

cards={120}

progress={84}

/>


<DeckCard

id="2"

title="French Vocabulary"

due={12}

cards={250}

progress={62}

/>



<CreateDeckCard />


</div>



</section>

 </div>

</main>

)

}