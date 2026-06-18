import Link from "next/link";


export default function CreateDeckCard(){

return (

<Link

href="/generate"

className="
flex
min-h-[180px]
items-center
justify-center
rounded-3xl
border-2
border-dashed
border-zinc-700
text-zinc-400
transition
hover:border-emerald-500
hover:text-emerald-400
"

>

<div
className="
text-center
"
>

<p
className="
text-4xl
"
>
+
</p>


<p>
Create Deck
</p>


</div>


</Link>

)

}