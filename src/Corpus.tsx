import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

export default function Corpus() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <Helmet>
        <title>Corpus: {id}</title>
      </Helmet>
      <section>
        <h1>{id}</h1>
      </section>
    </div>
  );
}
