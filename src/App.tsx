import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Topnav from './Topnav';
import Home from './Home';
import Corpora from './Corpora';
import Corpus from './Corpus';
import CorpusEntities from './CorpusEntities';
import Text from './Text';
import DocPage from './DocPage';
import ApiDoc from './ApiDoc';
import TextHome from './TextHome';
import TextEntities from './TextEntities';
import FullText from './FullText';

function matchDocPath(params: any): string | null {
  if (params.id) {
    return `/doc/${params.id}.md`;
  }
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <Topnav />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/corpora" element={<Corpora />} />
          <Route path="/corpora/:id" element={<Corpus />} />
          <Route path="/corpora/:id/entities" element={<CorpusEntities />} />
          <Route path="/corpora/:corpusId/:textId" element={<Text />}>
            <Route index element={<TextHome />} />
            <Route path="entities" element={<TextEntities />} />
            <Route path="animals" element={<TextEntities type="Animal" />} />
            <Route path="plants" element={<TextEntities type="Plant" />} />
            <Route path="fulltext" element={<FullText />} />
          </Route>
          <Route
            path="/doc/api"
            element={<ApiDoc url="/api/openapi.yaml" title="EcoCor API" />}
          />
          <Route path="/doc/:id" element={<DocPage match={matchDocPath} />} />
          <Route path="/merch" element={<DocPage url="/doc/merch.md" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
