"use client";

import { motion } from "framer-motion";

export default function AuthBackground() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

            <motion.div className="abolute left-1/2 top-[250px] h-[600px] 2-[600px] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[150px]"
                        animate={{
                            y:[0,40,0]
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity
                        }}
            />

            <motion.div className="absolute right-[-200px] bottom-[-200px] h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[150px]"
                        animate={{
                            y:[0, -50, 0]
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity
                        }}
            />

        </div>
    )
}