import { useEffect, useMemo, useRef, useState } from 'react';
import {
  WordCloud as ReactWordCloud,
  type Word,
} from '@isoterik/react-word-cloud';

export interface Props {
  words: Word[];
  height?: number;
  className?: string;
  enableTooltip?: boolean;
}

export default function WordCloud({
  words,
  height = 360,
  className,
  enableTooltip = true,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paddingSize, setPaddingSize] = useState(64);
  const [width, setWidth] = useState(0);

  const displayWords = useMemo(
    () => words.map((word) => ({ ...word, text: word.text.toUpperCase() })),
    [words]
  );

  const contentHeight = Math.max(0, height - paddingSize * 2);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    const rootFontSize = Number.parseFloat(
      window.getComputedStyle(document.documentElement).fontSize || '16'
    );
    setPaddingSize(rootFontSize * 1);

    const updateWidth = () => {
      setWidth(Math.floor(element.getBoundingClientRect().width));
    };

    updateWidth();

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => {
        updateWidth();
      });

      observer.observe(element);

      return () => {
        observer.disconnect();
      };
    }

    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: '100%',
        height,
        boxSizing: 'border-box',
        padding: '1em',
      }}
    >
      <div className="flex h-full w-full items-center justify-center">
        {width > 0 && displayWords.length > 0 ? (
          <ReactWordCloud
            words={displayWords}
            width={width}
            height={contentHeight}
            enableTooltip={enableTooltip}
            font="Rubik"
            fontStyle="normal"
            fontWeight="500"
            fontSize={(word) => Math.sqrt(word.value) * 4}
            rotate={(_word, index) => (index % 2 === 0 ? 0 : 90)}
            fill="var(--color-secondary-200)"
            padding={2}
            spiral="archimedean"
            transition="all .35s ease"
            svgProps={{
              role: 'img',
              'aria-label': 'Word cloud',
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            {words.length > 0
              ? 'Preparing word cloud...'
              : 'No terms available'}
          </div>
        )}
      </div>
    </div>
  );
}
