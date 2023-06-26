import ReactWordcloud from 'react-wordcloud';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

export interface Props {
  words: any;
}

export default function WordCloud({ words }: Props) {
  const options = {
    enableTooltip: true,
    deterministic: false,
    fontFamily: 'impact',
    fontSizes: [5, 60] as [number, number],
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: 1,
    rotations: 3,
    // rotationAngles: [0, 90],
    // scale: 'sqrt',
    // spiral: 'archimedean',
    transitionDuration: 1000,
  };

  return (
    <div>
      <ReactWordcloud words={words} options={options} />
    </div>
  );
}
