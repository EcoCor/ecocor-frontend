import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Topnav from './Topnav';
import Home from './Home';
import Corpora from './Corpora';
import Corpus from './Corpus';

function App() {
  return (
    <BrowserRouter>
      <Topnav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/corpora" element={<Corpora />} />
        <Route path="/corpora/:id" element={<Corpus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
