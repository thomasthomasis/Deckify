interface Props {
  title: string;
  children: React.ReactNode;
}

export default function AccountSection({ title, children }: Props) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-xl font-bold">{title}</h2>

      <div className="mt-4">{children}</div>
    </section>
  );
}
