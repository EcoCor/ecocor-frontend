import { createFileRoute } from '@tanstack/react-router';
import Corpora from '../../Corpora';

export const Route = createFileRoute('/corpora/')({
  component: Corpora,
});
