// Catalogue component
// Pure presentational layer — all data and handlers come in as props from CatalogueContainer.
// Owns layout, styling, and UI-only state (filter sheet open/close).
import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  Cross2Icon,
  MagnifyingGlassIcon,
  MixerVerticalIcon,
  PlusIcon,
} from '@radix-ui/react-icons';
import type {
  Availability,
  Climate,
  Color,
  Flower,
  FlowerFilter,
  FlowerType,
  FragranceLevel,
  GroupBy,
  Season,
  Toxicity,
} from '../../domain/Flower';
import { FilterChip } from '../FilterChip/FilterChip';
import { FlowerList } from '../FlowerList/FlowerList';
import { FilterPanel } from '../FilterPanel/FilterPanel';
import { SheetTitle } from '../SheetTitle/SheetTitle';
import styles from './Catalogue.module.css';

export interface CatalogueProps {
  flowers: Flower[];
  groupedFlowers: Record<string, Flower[]>;
  currentFilter: FlowerFilter;
  isLoading: boolean;
  availableColors: Color[];
  availableSeasons: Season[];
  availableTypes: FlowerType[];
  availableClimates: Climate[];
  stemLengthBounds: { min: number; max: number };
  vaseLifeBounds: { min: number; max: number };
  onSearchChange: (searchTerm: string) => void;
  onColorToggle: (color: Color) => void;
  onAvailabilityChange: (availability?: Availability) => void;
  onSeasonChange: (season?: Season) => void;
  onTypeChange: (type?: FlowerType) => void;
  onClimateChange: (climate?: Climate) => void;
  onFragranceLevelChange: (fragranceLevel?: FragranceLevel) => void;
  onToxicityChange: (toxicity?: Toxicity) => void;
  onStemLengthChange: (min: number, max: number) => void;
  onVaseLifeChange: (min: number, max: number) => void;
  onGroupByChange: (groupBy?: GroupBy) => void;
  onCardClick: (flowerId: string) => void;
  onAddFlowerClick: () => void;
  filterPills: Array<{ label: string; onClear: () => void }>;
}

export function Catalogue({
  flowers,
  groupedFlowers,
  currentFilter,
  isLoading,
  availableColors,
  availableSeasons,
  availableTypes,
  availableClimates,
  stemLengthBounds,
  vaseLifeBounds,
  onSearchChange,
  onColorToggle,
  onAvailabilityChange,
  onSeasonChange,
  onTypeChange,
  onClimateChange,
  onFragranceLevelChange,
  onToxicityChange,
  onStemLengthChange,
  onVaseLifeChange,
  onGroupByChange,
  onCardClick,
  onAddFlowerClick,
  filterPills,
}: CatalogueProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const hasActiveFilters = filterPills.length > 0;

  return (
    <div className={styles.root}>
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
                  <Dialog.Title asChild><SheetTitle>Filters</SheetTitle></Dialog.Title>
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
                  availableClimates={availableClimates}
                  stemLengthBounds={stemLengthBounds}
                  vaseLifeBounds={vaseLifeBounds}
                  currentFilter={currentFilter}
                  onColorToggle={onColorToggle}
                  onAvailabilityChange={onAvailabilityChange}
                  onSeasonChange={onSeasonChange}
                  onTypeChange={onTypeChange}
                  onClimateChange={onClimateChange}
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
            {filterPills.map((pill) => (
              <FilterChip
                key={pill.label}
                label={pill.label}
                selected
                showClearIcon
                onClick={pill.onClear}
                dataCy="filter-pill"
              />
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
