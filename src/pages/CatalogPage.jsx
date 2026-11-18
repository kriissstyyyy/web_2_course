import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Select from '../components/Select';
import PrimaryButton from '../components/PrimaryButton';
import CatalogCard from '../components/CatalogCard';
import airplanes from '../data/airplanes';
import './CatalogPage.css';

function CatalogPage() {
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

  return (
    <div className="catalog-page">
      <Header />
      <main className="catalog-main">
        <h1 className="catalog-title">Aircraft Catalog</h1>

        <div className="filters-bar">
          <Select label="Type" options={typeOptions} value="all" />
          <Select label="Sort by" options={sortOptions} value="name" />
          <div className="filters-action">
            <PrimaryButton>Apply</PrimaryButton>
          </div>
        </div>

        <div className="catalog-grid">
          {airplanes.map((item) => (
            <CatalogCard
              key={item.id}
              image={item.image}
              name={item.name}
              type={item.type}
              passengers={item.passengers}
              description={item.description}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CatalogPage;
