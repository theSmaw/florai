// Catalogue content component
// Pure presentational layer — all data and handlers come in as props from CatalogueContainer.
// Owns layout, styling, and UI-only state (filter sheet open/close).
import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  MagnifyingGlassIcon,
  MixerVerticalIcon,
  Cross2Icon,
  PlusIcon,
} from '@radix-ui/react-icons';
import type {
  Availability,
  Color,
  Flower,
  FlowerFilter,
  FlowerType,
  FragranceLevel,
  GroupBy,
  Season,
  Toxicity,
} from '../../domain/Flower';
import { FlowerList } from '../../components/FlowerList/FlowerList';
import { FilterPanel } from '../../components/FilterPanel/FilterPanel';
import styles from './CatalogueView.module.css';

interface CatalogueContentProps {
  flowers: Flower[];
  groupedFlowers: Record<string, Flower[]>;
  currentFilter: FlowerFilter;
  isLoading: boolean;
  availableColors: Color[];
  availableSeasons: Season[];
  availableTypes: FlowerType[];
  stemLengthBounds: { min: number; max: number };
  vaseLifeBounds: { min: number; max: number };
  onSearchChange: (searchTerm: string) => void;
  onColorToggle: (color: Color) => void;
  onAvailabilityChange: (availability?: Availability) => void;
  onSeasonChange: (season?: Season) => void;
  onTypeChange: (type?: FlowerType) => void;
  onFragranceLevelChange: (fragranceLevel?: FragranceLevel) => void;
  onToxicityChange: (toxicity?: Toxicity) => void;
  onStemLengthChange: (min: number, max: number) => void;
  onVaseLifeChange: (min: number, max: number) => void;
  onGroupByChange: (groupBy?: GroupBy) => void;
  onCardClick: (flowerId: string) => void;
  onAddFlowerClick: () => void;
}

export function CatalogueContent({
  flowers,
  groupedFlowers,
  currentFilter,
  isLoading,
  availableColors,
  availableSeasons,
  availableTypes,
  stemLengthBounds,
  vaseLifeBounds,
  onSearchChange,
  onColorToggle,
  onAvailabilityChange,
  onSeasonChange,
  onTypeChange,
  onFragranceLevelChange,
  onToxicityChange,
  onStemLengthChange,
  onVaseLifeChange,
  onGroupByChange,
  onCardClick,
  onAddFlowerClick,
}: CatalogueContentProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const hasActiveFilters =
    currentFilter.colors.length > 0 ||
    !!currentFilter.availability ||
    !!currentFilter.type ||
    !!currentFilter.season ||
    !!currentFilter.fragranceLevel ||
    !!currentFilter.toxicity ||
    !!currentFilter.stemLengthRange ||
    !!currentFilter.vaseLifeRange ||
    !!currentFilter.searchTerm;

  return (
    <div data-cy="catalogue-view" className={styles.root}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Catalogue</h1>
        </div>

        {/* Search + Filter trigger */}
        <div className={styles.searchBar}>
          <div className={styles.searchWrapper}>
            <MagnifyingGlassIcon
              className={styles.searchIcon}
              width={18}
              height={18}
              aria-hidden="true"
            />
            <input
              data-cy="search-input"
              type="text"
              value={currentFilter.searchTerm || ''}
              onChange={(e) => onSearchChange(e.target.value)}
              className={styles.searchInput}
              placeholder="Search flowers..."
            />
          </div>

          {/* Filter button doubles as Dialog trigger */}
          <Dialog.Root open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <Dialog.Trigger asChild>
              <button data-cy="filter-toggle-button" className={styles.filterButton}>
                <MixerVerticalIcon width={16} height={16} aria-hidden="true" />
                <span>Filter</span>
                {hasActiveFilters && <span className={styles.filterBadge} />}
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className={styles.overlay} />
              <Dialog.Content className={styles.sheet} aria-describedby={undefined}>
                {/* Sheet header */}
                <div className={styles.sheetHeader}>
                  <Dialog.Title className={styles.sheetTitle}>Filters</Dialog.Title>
                  <Dialog.Close asChild>
                    <button className={styles.closeButton} aria-label="Close filters">
                      <Cross2Icon width={15} height={15} aria-hidden="true" />
                    </button>
                  </Dialog.Close>
                </div>

                <FilterPanel
                  availableColors={availableColors}
                  availableSeasons={availableSeasons}
                  availableTypes={availableTypes}
                  stemLengthBounds={stemLengthBounds}
                  vaseLifeBounds={vaseLifeBounds}
                  currentFilter={currentFilter}
                  onColorToggle={onColorToggle}
                  onAvailabilityChange={onAvailabilityChange}
                  onSeasonChange={onSeasonChange}
                  onTypeChange={onTypeChange}
                  onFragranceLevelChange={onFragranceLevelChange}
                  onToxicityChange={onToxicityChange}
                  onStemLengthChange={onStemLengthChange}
                  onVaseLifeChange={onVaseLifeChange}
                  onGroupByChange={onGroupByChange}
                  onApplyFilters={() => setIsFilterOpen(false)}
                />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        {/* Active filter pills */}
        {hasActiveFilters && (
          <div data-cy="active-filters" className={styles.activeFilters}>
            {[
              ...currentFilter.colors,
              currentFilter.season,
              currentFilter.type,
              currentFilter.availability,
              currentFilter.fragranceLevel,
              currentFilter.toxicity,
              currentFilter.stemLengthRange &&
                `${currentFilter.stemLengthRange.min}–${currentFilter.stemLengthRange.max} cm`,
              currentFilter.vaseLifeRange &&
                `${currentFilter.vaseLifeRange.min}–${currentFilter.vaseLifeRange.max} days`,
              currentFilter.searchTerm,
            ]
              .filter((v): v is string => Boolean(v))
              .map((pill) => (
                <div key={pill} data-cy="filter-pill" className={styles.pill}>
                  {pill}
                </div>
              ))}
          </div>
        )}
      </header>

      {/* Flower list */}
      <FlowerList
        flowers={flowers}
        groupedFlowers={groupedFlowers}
        isLoading={isLoading}
        onCardClick={onCardClick}
      />

      {/* FAB */}
      <button data-cy="add-flower-button" onClick={onAddFlowerClick} className={styles.fab}>
        <PlusIcon width={24} height={24} aria-hidden="true" />
      </button>
    </div>
  );
}
