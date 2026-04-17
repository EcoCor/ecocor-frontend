import { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import {
  classnames,
  fontSize,
  fontWeight,
  padding,
  textAlign,
  TTailwindString,
} from 'tailwindcss-classnames';
import { Commit } from '@dracor/react';
import { CorpusListEntry } from './types';

function CorpusCardRow({
  label,
  data,
  dataStyle,
}: {
  label: string;
  data: number | string | ReactNode;
  dataStyle?: TTailwindString;
}) {
  const content = typeof data === 'number' ? data.toLocaleString('en') : data;
  const cellStyle = classnames(padding('pt-2', 'pb-1', 'px-3'));
  const tdStyle = classnames(cellStyle, fontWeight('font-bold'), dataStyle);
  const thStyle = classnames(
    cellStyle,
    textAlign('text-right'),
    fontWeight('font-normal')
  );
  return (
    <tr className="border-b-2 text-primary font-normal">
      <td className={tdStyle}>{content}</td>
      <th className={thStyle}>{label}</th>
    </tr>
  );
}

export default function CorpusCard({ corpus }: { corpus: CorpusListEntry }) {
  const { name, title, commit, repository, metrics, updated } = corpus;
  const repoUrl = repository?.split('#')[0];
  return (
    <div className="rounded-xl inline-block shadow-lg">
      <div className="bg-white rounded-t-xl p-2 text-2xl font-bold">
        <Link to={name} className="text-primary">
          {title}
        </Link>
      </div>
      {metrics && (
        <table className="m-0">
          <tbody>
            <CorpusCardRow
              label="Number of texts"
              data={metrics.numOfTexts}
              dataStyle={classnames(fontSize('text-2xl'))}
            />
            <CorpusCardRow
              label="Number of authors"
              data={metrics.numOfAuthors}
            />
            <CorpusCardRow
              label="Number of paragraphs"
              data={metrics.numOfParagraphs}
            />
            <CorpusCardRow label="Number of Words" data={metrics.numOfWords} />
            <CorpusCardRow
              label="Number of Entities"
              data={metrics.numOfEntities}
            />
            <CorpusCardRow
              label="Number of Animals"
              data={metrics.numOfAnimals}
            />
            <CorpusCardRow
              label="Number of Plants"
              data={metrics.numOfPlants}
            />
            <CorpusCardRow
              label="Git commit"
              data={commit ? <Commit repo={repoUrl}>{commit}</Commit> : 'n/a'}
            />
            <CorpusCardRow
              label="last update"
              data={updated ? new Date(updated).toLocaleString() : 'n/a'}
            />
          </tbody>
        </table>
      )}
    </div>
  );
}
