"use client";

import { motion } from "framer-motion";

interface Props {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

export default function AuthCard({ title, subtitle, children }:Props) {

    return (
        
        <motion.div
            initial={{
                opacity: 0,
                y: 20
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            transition={{
                duration: 0.5
            }}

            className="relative z-10 w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blue-xl shadow-2xl"
        >

            <h1 className="text-center text-4xl font-black">
                {title}
            </h1>

            <p className="mt-3 text-center text-zinc-400">
                {subtitle}
            </p>

            <div className="mt-8">
                {children}
            </div>
        </motion.div>
    )
}