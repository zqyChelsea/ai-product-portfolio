import { LocaleRedirect } from '@/app/components/LocaleRedirect';
import { PortfolioHome } from '@/app/components/PortfolioHome';

export default function Home() {
  return <><LocaleRedirect /><PortfolioHome locale="en" /></>;
}
