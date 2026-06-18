import Link from "next/link";


interface Props {

id:string;

title:string;

due:number;

cards:number;

progress:number;

}


export default function DeckCard({
id,
title,
due,
cards,
progress
}:Props){


return (

<Link

href={`/decks/${id}`}

className="
group
rounded-3xl
border
border-white/10
bg-white/5
p-6
transition-all
duration-300
hover:-translate-y-2
hover:border-emerald-500/50
"

>


<h3
className="
text-xl
font-semibold
"
>
{title}
</h3>



<div
className="
mt-4
flex
justify-between
text-sm
text-zinc-400
"
>

<span>
{due} due
</span>


<span>
{cards} cards
</span>


</div>



<div
className="
mt-5
h-2
rounded-full
bg-zinc-800
overflow-hidden
"
>

<div

className="
h-full
bg-emerald-500
"

style={{
width:`${progress}%`
}}

/>


</div>



<p
className="
mt-3
text-sm
text-zinc-500
"
>
{progress}% mastered
</p>


</Link>


)

}