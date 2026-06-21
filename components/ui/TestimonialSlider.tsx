'use client';

const testimonials = [
  '⭐ Saved me hours every week — Sarah',
  "⭐ Best AI study tool I've used — James",
  '⭐ Finally enjoy revision — Emma',
  '⭐ Perfect for university exams — Alex',
  '⭐ The AI cards are surprisingly accurate — Michael',
  '⭐ Makes studying feel effortless — Olivia',
];

export default function TestimonialSlider() {
  return (
    <section className="relative mt-24 overflow-hidden border-y border-zinc-800 bg-zinc-950/50 py-4">
      <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <span key={index} className="text-sm font-medium text-zinc-400">
            {testimonial}
          </span>
        ))}
      </div>
    </section>
  );
}
