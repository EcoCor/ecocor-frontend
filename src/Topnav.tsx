import { NavBar } from '@dracor/react';
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
            { to: '/doc/about', label: 'What is EcoCor' },
            { to: '/doc/credits', label: 'Credits' },
            { to: '/doc/imprint-and-gdpr', label: 'Imprint and GDPR' },
          ],
        },
        {
          label: 'Corpora',
          items: [
            { to: '/corpora/en', label: 'English EcoCor' },
            { to: '/corpora/de', label: 'German EcoCor' },
          ],
        },
        { label: 'API', to: '/doc/api' },
      ]}
    />
  );
}
