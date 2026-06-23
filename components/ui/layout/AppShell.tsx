import Navbar from '@/components/ui/layout/Navbar';
import Sidebar from '@/components/ui/layout/Sidebar';
import MobileNav from '@/components/ui/layout/MobileNav';
import Footer from '@/components/ui/layout/Footer';
import CookieBanner from '@/components/ui/layout/CookieBanner';

interface Props {
  children: React.ReactNode;
}

export default function AppShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 px-6 py-8 pb-24 lg:pb-8">{children}</main>
      </div>

      <MobileNav />

      <Footer />

      <CookieBanner />
    </div>
  );
}
