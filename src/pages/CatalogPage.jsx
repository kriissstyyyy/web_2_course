import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Select from '../components/Select';
import CatalogCard from '../components/CatalogCard';
import Loader from '../components/Loader';
import { getAirplanes } from '../api/airplanesApi';
import { resolveImage } from '../utils/imageMap';
import './CatalogPage.css';

function CatalogPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const typeOptions = [
    { value: 'all', label: 'All types' },
    { value: 'Boeing', label: 'Boeing' },
    { value: 'Airbus', label: 'Airbus' },
    { value: 'Embraer', label: 'Embraer' },
    { value: 'Bombardier', label: 'Bombardier' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'passengers', label: 'Passengers' },
    { value: 'fuel', label: 'Fuel volume' }
  ];

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (typeFilter && typeFilter !== 'all') {
          params.type = typeFilter;
        }
        if (searchQuery.trim()) {
          params.search = searchQuery.trim();
        }
        const data = await getAirplanes(params);
        await new Promise((resolve) => setTimeout(resolve, 1200));
        if (!cancelled) {
          setItems(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load aircraft. Is the API running on port 5001?');
          setItems([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    const timer = setTimeout(fetchData, searchQuery ? 300 : 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [typeFilter, searchQuery]);

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
    if (sortBy === 'passengers') return (b.passengers || 0) - (a.passengers || 0);
    if (sortBy === 'fuel') return (b.fuelVolume || 0) - (a.fuelVolume || 0);
    return 0;
  });

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

        {loading && <Loader />}

        {error && !loading && <p className="catalog-error">{error}</p>}

        {!loading && !error && (
          <>
            <p className="catalog-count">{sortedItems.length} aircraft found</p>
            <div className="catalog-grid">
              {sortedItems.map((item) => (
                <Link key={item.id} to={`/item/${item.id}`} className="catalog-card-link">
                  <CatalogCard
                    image={resolveImage(item.image)}
                    name={item.name}
                    type={item.type}
                    passengers={item.passengers}
                    description={item.description}
                  />
                </Link>
              ))}
            </div>
            {sortedItems.length === 0 && (
              <p className="catalog-empty">No aircraft match your filters</p>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default CatalogPage;
