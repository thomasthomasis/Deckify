import AIDemo from "@/components/ui/AIDemo";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import CTA from "@/components/ui/CTA";
import Features from "@/components/ui/Features";
import Hero from "@/components/ui/Hero";
import TestimonialSlider from "@/components/ui/TestimonialSlider";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }
  
  return (
    <main
      className="
      relative
      min-h-screen
      overflow-hidden
      bg-zinc-950
      text-white
      "
    >

      <AnimatedBackground />

      <Hero />

      <AIDemo />

      <TestimonialSlider />

      <Features />

      <CTA />

    </main>
  );
}