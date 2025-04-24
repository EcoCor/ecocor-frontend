import { createFileRoute } from '@tanstack/react-router';
import FullText from '../../../../FullText';

export const Route = createFileRoute('/corpora/$corpusId/$textId/fulltext')({
  component: FullText,
});
