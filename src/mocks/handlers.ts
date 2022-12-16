import { rest } from 'msw';
import { CorpusListEntry, CorpusData } from '../types';

const corpora: CorpusListEntry[] = require('./data/corpora.json');
const works: CorpusData = require('./data/works.json');

const apiBase = process.env.REACT_APP_ECOCOR_API;
const delay = parseInt(process.env.REACT_APP_MOCK_API_DELAY || '0');

const corpusData: { [index: string]: CorpusData } = { works };

export const handlers = [
  rest.get(`${apiBase}/corpora`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(delay), ctx.json(corpora));
  }),

  rest.get(`${apiBase}/corpora/:corpusId`, (req, res, ctx) => {
    const { corpusId } = req.params;
    const corpus = corpusData[corpusId as string];
    if (corpus) {
      return res(ctx.status(200), ctx.delay(delay), ctx.json(corpus));
    } else {
      return res(ctx.status(404), ctx.json({ message: 'no such corpus' }));
    }
  }),

  rest.get(`${apiBase}/corpora/:corpusId/work/:workName`, (req, res, ctx) => {
    const { corpusId, workName } = req.params;
    const corpus = corpusData[corpusId as string];
    if (corpus) {
      const work = corpus.works.find((p) => p.name === workName);
      if (work) {
        return res(ctx.status(200), ctx.delay(delay), ctx.json(work));
      }
      return res(ctx.status(404), ctx.json({ message: 'no such work' }));
    } else {
      return res(ctx.status(404), ctx.json({ message: 'no such corpus' }));
    }
  }),
];
