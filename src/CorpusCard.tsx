import { Link } from 'react-router-dom';
import {
  classnames,
  fontSize,
  fontWeight,
  padding,
  textAlign,
  TTailwindString,
} from 'tailwindcss-classnames';
import { CorpusListEntry } from './types';

function CorpusCardRow({
  label,
  data,
  dataStyle,
}: {
  label: string;
  data: number;
  dataStyle?: TTailwindString;
}) {
  const cellStyle = classnames(padding('pt-2', 'pb-1', 'px-3'));
  const tdStyle = classnames(cellStyle, fontWeight('font-bold'), dataStyle);
  const thStyle = classnames(
    cellStyle,
    textAlign('text-right'),
    fontWeight('font-normal')
  );
  return (
    <tr className="border-b-2 text-primary font-normal">
      <td className={tdStyle}>{data.toLocaleString('en')}</td>
      <th className={thStyle}>{label}</th>
    </tr>
  );
}

export default function CorpusCard({ corpus }: { corpus: CorpusListEntry }) {
  const { name, title, metrics } = corpus;
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
              data={metrics.texts}
              dataStyle={classnames(fontSize('text-2xl'))}
            />
            <CorpusCardRow label="Number of authors" data={metrics.authors} />
            <CorpusCardRow label="Number of Words" data={metrics.words} />
            <CorpusCardRow label="Number of Entities" data={metrics.entities} />
            <CorpusCardRow label="Number of Animals" data={metrics.animals} />
            <CorpusCardRow label="Number of Plants" data={metrics.plants} />
          </tbody>
        </table>
      )}
    </div>
  );
}
