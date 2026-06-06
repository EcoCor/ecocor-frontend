import { NavBar } from '@dracor/react';
import logo from './images/ecocor.svg';

export default function Topnav() {
  return (
    <NavBar
      title="EcoCor - ecocritical corpora"
      logo={logo}
      logoClass="animate-spin-slow infinite"
      gitHubUrl="https://github.com/EcoCor"
      navItems={[
        {
          label: 'About',
          items: [
            // @ts-expect-error - FIXME `to`
            { to: '/doc/about', label: 'What is EcoCor' },
            // @ts-expect-error - FIXME `to`
            { to: '/doc/notes-on-ecocor-de', label: 'Notes on EcoCor-DE' },
            // @ts-expect-error - FIXME `to`
            { to: '/doc/credits', label: 'Credits' },
            // @ts-expect-error - FIXME `to`
            { to: '/doc/imprint-and-gdpr', label: 'Imprint and GDPR' },
          ],
        },
        {
          label: 'Corpora',
          items: [
            // @ts-expect-error - FIXME `to`
            { to: '/corpora/en', label: 'English EcoCor' },
            // @ts-expect-error - FIXME `to`
            { to: '/corpora/de', label: 'German EcoCor' },
          ],
        },
        { label: 'API', to: '/doc/api' },
      ]}
    />
  );
}
