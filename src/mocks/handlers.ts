import { http, delay, HttpResponse } from 'msw';
import { CorpusData, Text } from '../types';

const corpora: CorpusData[] = require('./data/corpora.json');
const textsMap: { [index: string]: Text[] } = require('./data/texts.json');

const apiBase = import.meta.env.VITE_ECOCOR_API;
const d = parseInt(import.meta.env.VITE_MOCK_API_DELAY || '0');

export const handlers = [
  http.get(`${apiBase}/corpora`, async () => {
    return HttpResponse.json(corpora, { status: 200 });
    await delay(d);
  }),

  http.get(`${apiBase}/corpora/:corpusId`, async ({ params }) => {
    const { corpusId } = params;
    await delay(d);
    const corpus = corpora.find((c) => c.name === corpusId);
    if (corpus) {
      return HttpResponse.json(corpus, { status: 200 });
    } else {
      return HttpResponse.json({ message: 'no such corpus' }, { status: 404 });
    }
  }),

  http.get(`${apiBase}/corpora/:corpusId/texts`, async ({ params }) => {
    const { corpusId } = params;
    await delay(d);
    const texts = textsMap[corpusId as string];
    if (texts) {
      return HttpResponse.json(texts, { status: 200 });
    } else {
      return HttpResponse.json({ message: 'no such corpus' }, { status: 404 });
    }
  }),

  http.get(
    `${apiBase}/corpora/:corpusId/texts/:textName`,
    async ({ params }) => {
      const { corpusId, textName } = params;
      await delay(d);
      const texts = textsMap[corpusId as string];
      if (texts) {
        const text = texts.find((w) => w.name === textName);
        if (text) {
          return HttpResponse.json(text, { status: 200 });
        }
        return HttpResponse.json({ message: 'no such text' }, { status: 404 });
      } else {
        return HttpResponse.json(
          { message: 'no such corpus' },
          { status: 404 }
        );
      }
    }
  ),
];
