import Link from "next/link";


export default function ContinueLearning(){

return (

<section
className="
mt-12
"
>


<h2
className="
text-2xl
font-bold
"
>
Continue Learning
</h2>


<div
className="
mt-6
rounded-[32px]
border
border-emerald-500/20
bg-gradient-to-br
from-emerald-500/20
via-zinc-900
to-zinc-950
p-8
"
>


<div
className="
flex
items-center
justify-between
"
>


<div>

<p
className="
text-sm
text-zinc-400
"
>
Recommended
</p>


<h3
className="
mt-2
text-3xl
font-bold
"
>
Biology Midterm
</h3>


<p
className="
mt-3
text-zinc-400
"
>
18 cards ready for review
</p>


</div>



<div
className="
hidden
text-6xl
md:block
"
>
🧬
</div>


</div>



<Link

href="/study"

className="
mt-8
inline-block
rounded-xl
bg-emerald-500
px-6
py-3
font-semibold
text-black
transition
hover:scale-105
hover:bg-emerald-400
"

>
Start Studying
</Link>



</div>


</section>

)

}