"use client";

import { motion } from "framer-motion";


export default function AnimatedBackground(){

return (

<div
className="
pointer-events-none
absolute
inset-0
overflow-hidden
"
>


<motion.div

className="
absolute
left-1/2
top-[-250px]
h-[600px]
w-[600px]
-translate-x-1/2
rounded-full
bg-emerald-500/20
blur-[140px]
"

animate={{
x:[
"-50%",
"-45%",
"-50%"
],

y:[
0,
40,
0
]

}}

transition={{
duration:10,
repeat:Infinity,
ease:"easeInOut"
}}

/>



<motion.div

className="
absolute
right-[-200px]
top-[400px]
h-[500px]
w-[500px]
rounded-full
bg-blue-500/10
blur-[140px]
"

animate={{

y:[
0,
-60,
0
],

x:[
0,
40,
0
]

}}

transition={{

duration:12,
repeat:Infinity,
ease:"easeInOut"

}}

/>



<motion.div

className="
absolute
left-[-200px]
bottom-[200px]
h-[400px]
w-[400px]
rounded-full
bg-purple-500/10
blur-[140px]
"

animate={{

y:[
0,
50,
0
]

}}

transition={{

duration:14,
repeat:Infinity,
ease:"easeInOut"

}}

/>


</div>

)

}