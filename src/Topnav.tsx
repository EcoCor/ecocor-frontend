import { Link } from 'react-router-dom';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Topnav() {
  return (
    <nav className="flex items-center justify-between flex-wrap p-4 bg-primary text-white font-medium">
      <h1>
        <Link to="/" className="text-white hover:text-white font-light">
          EcoCor
        </Link>
      </h1>
      <div>
        <a
          href="https://github.com/dh-network/ecocor-api"
          title="EcoCor Github"
          className="text-white"
        >
          <FontAwesomeIcon icon={faGithub} size="2xl" />
        </a>
      </div>
    </nav>
  );
}
