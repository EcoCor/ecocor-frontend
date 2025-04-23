import { Helmet } from 'react-helmet-async';
import { Navigate } from '@tanstack/react-router';

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>EcoCor</title>
      </Helmet>
      <Navigate to="/corpora" />
    </div>
  );
}
