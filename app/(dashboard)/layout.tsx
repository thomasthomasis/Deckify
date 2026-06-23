import AppShell from '@/components/ui/layout/AppShell';

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return <AppShell>{children}</AppShell>;
}
