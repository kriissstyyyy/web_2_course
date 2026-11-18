import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Select from '../components/Select';
import PrimaryButton from '../components/PrimaryButton';
import CatalogCard from '../components/CatalogCard';
import { useItems } from '../context/ItemsContext';
import './CatalogPage.css';

function CatalogPage() {
  const { items } = useItems();
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const typeOptions = [
    { value: 'all', label: 'All types' },
    { value: 'narrow-body', label: 'Narrow-body' },
    { value: 'wide-body', label: 'Wide-body' },
    { value: 'regional', label: 'Regional' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'passengers', label: 'Passengers' },
    { value: 'fuel', label: 'Fuel volume' }
  ];

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (typeFilter !== 'all') {
      result = result.filter((item) => item.type === typeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'passengers') {
      result.sort((a, b) => b.passengers - a.passengers);
    } else if (sortBy === 'fuel') {
      result.sort((a, b) => b.fuelVolume - a.fuelVolume);
    }

    return result;
  }, [items, typeFilter, searchQuery, sortBy]);

  return (
    <div className="catalog-page">
      <Header />
      <main className="catalog-main">
        <h1 className="catalog-title">Aircraft Catalog</h1>

        <div className="filters-bar">
          <div className="search-wrap">
            <label className="select-label">Search</label>
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            label="Type"
            options={typeOptions}
            value={typeFilter}
            onChange={setTypeFilter}
          />
          <Select
            label="Sort by"
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
          />
        </div>

        <p className="catalog-count">{filteredItems.length} aircraft found</p>

        <div className="catalog-grid">
          {filteredItems.map((item) => (
            <Link key={item.id} to={`/item/${item.id}`} className="catalog-card-link">
              <CatalogCard
                image={item.image}
                name={item.name}
                type={item.type}
                passengers={item.passengers}
                description={item.description}
              />
            </Link>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className="catalog-empty">No aircraft match your filters</p>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default CatalogPage;
