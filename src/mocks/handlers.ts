import { rest } from 'msw';
import { CorpusData, Text } from '../types';

const corpora: CorpusData[] = require('./data/corpora.json');
const textsMap: { [index: string]: Text[] } = require('./data/texts.json');

const apiBase = process.env.REACT_APP_ECOCOR_API;
const delay = parseInt(process.env.REACT_APP_MOCK_API_DELAY || '0');

export const handlers = [
  rest.get(`${apiBase}/corpora`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(delay), ctx.json(corpora));
  }),

  rest.get(`${apiBase}/corpora/:corpusId`, (req, res, ctx) => {
    const { corpusId } = req.params;
    const corpus = corpora.find((c) => c.name === corpusId);
    if (corpus) {
      return res(ctx.status(200), ctx.delay(delay), ctx.json(corpus));
    } else {
      return res(ctx.status(404), ctx.json({ message: 'no such corpus' }));
    }
  }),

  rest.get(`${apiBase}/corpora/:corpusId/texts`, (req, res, ctx) => {
    const { corpusId } = req.params;
    const texts = textsMap[corpusId as string];
    if (texts) {
      return res(ctx.status(200), ctx.delay(delay), ctx.json(texts));
    } else {
      return res(ctx.status(404), ctx.json({ message: 'no such corpus' }));
    }
  }),

  rest.get(`${apiBase}/corpora/:corpusId/texts/:textName`, (req, res, ctx) => {
    const { corpusId, textName } = req.params;
    const texts = textsMap[corpusId as string];
    if (texts) {
      const text = texts.find((w) => w.name === textName);
      if (text) {
        return res(ctx.status(200), ctx.delay(delay), ctx.json(text));
      }
      return res(ctx.status(404), ctx.json({ message: 'no such text' }));
    } else {
      return res(ctx.status(404), ctx.json({ message: 'no such corpus' }));
    }
  }),
];
