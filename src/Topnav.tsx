import { NavBar } from '@dracor.org/react';
import packageInfo from '../package.json';
import logo from './images/ecocor.svg';

export default function Topnav() {
  return (
    <NavBar
      title="EcoCor"
      version={packageInfo.version}
      logo={logo}
      logoClass="animate-spin-slow infinite"
      gitHubUrl="https://github.com/EcoCor"
      navItems={[
        {
          label: 'About',
          items: [
            { href: '/doc/about', label: 'What is EcoCor' },
            { href: '/doc/credits', label: 'Credits' },
            { href: '/doc/faq', label: 'FAQ' },
            { href: '/doc/imprint-and-gdpr', label: 'Imprint and GDPR' },
          ],
        },
        {
          label: 'Corpora',
          items: [
            { href: '/corpora/en', label: 'English EcoCor' },
            { href: '/corpora/de', label: 'German EcoCor' },
          ],
        },
        { label: 'Merch', href: '/merch' },
      ]}
    />
  );
}
