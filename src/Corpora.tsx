import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Corpora() {
  return (
    <div>
      <Helmet>
        <title>Corpora</title>
      </Helmet>
      <section>
        <h1>Corpora</h1>
        <ul>
          <li>
            <Link to="foo">foo</Link>
          </li>
          <li>
            <Link to="bar">bar</Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
