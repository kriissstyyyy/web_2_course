import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ItemsProvider } from './context/ItemsContext';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ItemPage from './pages/ItemPage';
import './App.css';

function App() {
  return (
    <ItemsProvider>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/item/:id" element={<ItemPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ItemsProvider>
  );
}

export default App;
