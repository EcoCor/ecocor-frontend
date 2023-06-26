import { Link } from 'react-router-dom';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import packageInfo from '../package.json';
import logo from './images/ecocor.svg';

export default function Topnav() {
  return (
    <nav className="flex items-center justify-between flex-wrap p-4 bg-primary text-white font-medium">
      <img
        alt="EcoCor Logo"
        title="EcoCor"
        className="animate-spin-slow infinite w-12"
        src={logo}
      ></img>
      <h1>
        <Link to="/" className="text-white hover:text-white font-light">
          EcoCor
        </Link>{' '}
        <span className="text-xs ml-1">v{packageInfo.version}</span>
      </h1>
      <div>
        <a
          href="https://github.com/EcoCor"
          title="EcoCor Github"
          className="text-white"
        >
          <FontAwesomeIcon icon={faGithub} size="2xl" />
        </a>
      </div>
    </nav>
  );
}
