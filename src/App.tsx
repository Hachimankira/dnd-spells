import { Route, Routes } from 'react-router-dom';
import './App.css'
import SpellList from './pages/SpellList';
import SpellDetailPage from './pages/SpellDetail';

function App() {

  return (
    <Routes>
      <Route path="/" element={<SpellList />} />
      <Route path="/spell/:index" element={<SpellDetailPage />} />
    </Routes>
  );
}

export default App;

