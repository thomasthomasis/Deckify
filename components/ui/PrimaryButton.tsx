import Link from 'next/link';

interface Props {
  href: string;
  children: React.ReactNode;
}

export default function PrimaryButton({ href, children }: Props) {
  return (
    <Link
      href={href}
      className="group hover:shadow-[0_0_40px_rgba(16, 185, 129, 0.4)] relative overflow-hidden rounded-2xl bg-emerald-500 px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 active:scale-95"
    >
      <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />

      <span className="relative">{children}</span>
    </Link>
  );
}
