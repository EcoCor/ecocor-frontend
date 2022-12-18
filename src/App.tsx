import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Topnav from './Topnav';
import Home from './Home';
import Corpora from './Corpora';
import Corpus from './Corpus';
import Work from './Work';

function App() {
  return (
    <BrowserRouter>
      <Topnav />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/corpora" element={<Corpora />} />
          <Route path="/corpora/:id" element={<Corpus />} />
          <Route path="/corpora/:corpusId/:workId" element={<Work />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
