import { rest } from 'msw';
import { CorpusData, Work } from '../types';

const corpora: CorpusData[] = require('./data/corpora.json');
const worksMap: { [index: string]: Work[] } = require('./data/works.json');

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

  rest.get(`${apiBase}/corpora/:corpusId/works`, (req, res, ctx) => {
    const { corpusId } = req.params;
    const works = worksMap[corpusId as string];
    if (works) {
      return res(ctx.status(200), ctx.delay(delay), ctx.json(works));
    } else {
      return res(ctx.status(404), ctx.json({ message: 'no such corpus' }));
    }
  }),

  rest.get(`${apiBase}/corpora/:corpusId/works/:workName`, (req, res, ctx) => {
    const { corpusId, workName } = req.params;
    const works = worksMap[corpusId as string];
    if (works) {
      const work = works.find((w) => w.name === workName);
      if (work) {
        return res(ctx.status(200), ctx.delay(delay), ctx.json(work));
      }
      return res(ctx.status(404), ctx.json({ message: 'no such work' }));
    } else {
      return res(ctx.status(404), ctx.json({ message: 'no such corpus' }));
    }
  }),
];
