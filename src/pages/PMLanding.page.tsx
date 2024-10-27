import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { PMHero } from '@/components/PMHero/PMHero';
import { Header } from '@/components/Header/Header';

export function PMLandingPage() {
  return (
    <>
      <Header />
      <PMHero />
      <ColorSchemeToggle />
    </>
  );
}
