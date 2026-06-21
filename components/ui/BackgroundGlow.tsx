export default function BackgroundGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-[-200px] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-green-500/20 blur-[120px]" />

      <div className="absolute top-[300px] right-[-200px] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px]" />
    </div>
  );
}
