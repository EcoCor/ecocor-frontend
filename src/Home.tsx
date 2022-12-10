import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>EcoCor</title>
      </Helmet>
      <section>
        <h1>Welcome to EcoCor</h1>
      </section>
    </div>
  );
}
