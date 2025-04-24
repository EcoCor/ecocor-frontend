import { Navigate } from '@tanstack/react-router';

export default function TextHome() {
  return <Navigate from="/corpora/$corpusId/$textId" to="entities" replace />;
}
