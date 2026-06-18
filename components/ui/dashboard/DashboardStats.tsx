"use client";

const stats = [
  {
    title: "Current Streak",
    value: "🔥 7 days",
  },
  {
    title: "Due Today",
    value: "18 cards",
  },
  {
    title: "Cards Learned",
    value: "642",
  },
];


export default function DashboardStats() {

return (

<div
className="
mt-10
grid
gap-5
md:grid-cols-3
"
>

{
stats.map((stat)=>(
<div
key={stat.title}
className="
rounded-3xl
border
border-white/10
bg-white/5
p-6
backdrop-blur-xl
transition-all
duration-300
hover:-translate-y-1
hover:border-emerald-500/40
"
>

<p
className="
text-sm
text-zinc-400
"
>
{stat.title}
</p>


<h2
className="
mt-3
text-3xl
font-bold
"
>
{stat.value}
</h2>


</div>
))
}


</div>

)

}