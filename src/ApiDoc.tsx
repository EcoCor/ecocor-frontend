import SwaggerUI from 'swagger-ui-react';

import 'swagger-ui-react/swagger-ui.css';

export interface Props {
  url: string;
  title?: string;
}

export default function ApiDoc({ url, title }: Props) {
  return (
    <div>
      {title && <title>{title}</title>}
      <SwaggerUI url={url} deepLinking />
    </div>
  );
}
