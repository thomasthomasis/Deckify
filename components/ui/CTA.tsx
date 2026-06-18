import Link from "next/link";

export default function CTA() {
  return (
    <section
      className="
      mx-auto
      mt-32
      max-w-4xl
      px-6
      pb-32
      text-center
      "
    >

      <h2
        className="
        text-5xl
        font-bold
        "
      >
        Ready to transform how you study?
      </h2>

      <Link
        href="/signup"
        className="
        mt-10
        inline-block
        rounded-2xl
        bg-emerald-500
        px-10
        py-5
        text-lg
        font-bold
        text-black
        "
      >
        Start Learning Today
      </Link>

    </section>
  );
}