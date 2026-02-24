/**
 * Catalogue view component
 * Pure UI - displays the catalogue header, search, filters, and flower list
 * Documentation:
 * - CATALOGUE_IMPLEMENTATION.md (feature design and behaviour)
 * - ARCHITECTURE.md (laminar flow and app structure)
 * - CODING_CONVENTIONS.md (naming and UI patterns)
 */
import type { Flower, FlowerFilter } from '../../domain/Flower';
import { FlowerList } from '../../components/FlowerList/FlowerList.tsx';
import { HeaderMenu } from '../../components/HeaderMenu/HeaderMenu.tsx';
import { FilterPanel } from '../../components/FilterPanel/FilterPanel.tsx';

interface CatalogueViewProps {
  flowers: Flower[];
  groupedFlowers?: Record<string, Flower[]>;
  availableColors: string[];
  currentFilter: FlowerFilter;
  isLoading?: boolean;
  isFilterOpen?: boolean;
  onSearchChange: (searchTerm: string) => void;
  onFilterClick: () => void;
  onColorToggle: (color: string) => void;
  onAvailabilityChange: (availability?: 'always' | 'seasonal' | 'limited') => void;
  onGroupByChange: (groupBy?: 'color' | 'type' | 'none') => void;
  onApplyFilters: () => void;
  onCardClick: (flowerId: string) => void;
  onAddFlowerClick: () => void;
}

import styles from './CatalogueView.module.css';

export function CatalogueView({
  flowers,
  groupedFlowers,
  availableColors,
  currentFilter,
  isLoading,
  isFilterOpen,
  onSearchChange,
  onFilterClick,
  onColorToggle,
  onAvailabilityChange,
  onGroupByChange,
  onApplyFilters,
  onCardClick,
  onAddFlowerClick,
}: CatalogueViewProps) {
  return (
    <div data-cy="catalogue-view" className={styles.root}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>
            Catalogue
          </h1>
          <div className={styles.iconButtons}>
            <HeaderMenu />
            <button className={styles.iconButton}>
              <span className="material-icons">notifications_none</span>
            </button>
            <button className={styles.iconButton}>
              <span className="material-icons">account_circle</span>
            </button>
          </div>
        </div>


        {/* Search and Filter Bar */}
        <div className={styles.searchBar}>
          <div className={styles.searchWrapper}>
            <span className={`material-icons ${styles.searchIcon}`}>
              search
            </span>
            <input
              data-cy="search-input"
              type="text"
              value={currentFilter.searchTerm || ''}
              onChange={(e) => onSearchChange(e.target.value)}
              className={styles.searchInput}
              placeholder="Search flowers..."
            />
          </div>
          <button
            data-cy="filter-toggle-button"
            onClick={onFilterClick}
            className={styles.filterButton}
          >
            <span className="material-icons">tune</span>
            <span>Filter</span>
          </button>
        </div>

        {/* Active Filters Display */}
        {(currentFilter.colors.length > 0 ||
          currentFilter.availability ||
          currentFilter.searchTerm) && (
          <div data-cy="active-filters" className={styles.activeFilters}>
            {currentFilter.colors.map((color: string) => (
              <div
                key={color}
                data-cy="filter-pill"
                className={styles.pill}
              >
                {color}
              </div>
            ))}
            {currentFilter.availability && (
              <div data-cy="filter-pill" className={styles.pill}>
                {currentFilter.availability}
              </div>
            )}
            {currentFilter.searchTerm && (
              <div data-cy="filter-pill" className={styles.pill}>
                {currentFilter.searchTerm}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Filter Panel */}
      {isFilterOpen && (
        <FilterPanel
          availableColors={availableColors}
          currentFilter={currentFilter}
          onSearchChange={onSearchChange}
          onColorToggle={onColorToggle}
          onAvailabilityChange={onAvailabilityChange}
          onGroupByChange={onGroupByChange}
          onApplyFilters={onApplyFilters}
        />
      )}

      {/* Main Content */}
      <FlowerList
        flowers={flowers}
        onCardClick={onCardClick}
        {...(groupedFlowers ? { groupedFlowers } : {})}
        {...(isLoading !== undefined ? { isLoading } : {})}
      />

      {/* Floating Action Button */}
      <button
        data-cy="add-flower-button"
        onClick={onAddFlowerClick}
        className={styles.fab}
      >
        <span className="material-icons" style={{ fontSize: '28px' }}>add</span>
      </button>

    </div>
  );
}
