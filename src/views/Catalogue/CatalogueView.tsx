/**
 * Catalogue view component
 * Pure UI - displays the catalogue header, search, filters, and flower list
 */
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
  FragranceLevel,
  GroupBy,
  Season,
  Toxicity,
} from '../../domain/Flower';
import { FlowerList } from '../../components/FlowerList/FlowerList.tsx';
import { FilterPanel } from '../../components/FilterPanel/FilterPanel.tsx';
import styles from './CatalogueView.module.css';

interface CatalogueViewProps {
  flowers: Flower[];
  groupedFlowers?: Record<string, Flower[]>;
  availableColors: Color[];
  availableSeasons: Season[];
  availableTypes: string[];
  stemLengthBounds: { min: number; max: number };
  vaseLifeBounds: { min: number; max: number };
  currentFilter: FlowerFilter;
  isLoading?: boolean;
  isFilterOpen: boolean;
  onFilterOpenChange: (open: boolean) => void;
  onSearchChange: (searchTerm: string) => void;
  onColorToggle: (color: Color) => void;
  onAvailabilityChange: (availability?: Availability) => void;
  onSeasonChange: (season?: Season) => void;
  onTypeChange: (type?: string) => void;
  onFragranceLevelChange: (fragranceLevel?: FragranceLevel) => void;
  onToxicityChange: (toxicity?: Toxicity) => void;
  onStemLengthChange: (min: number, max: number) => void;
  onVaseLifeChange: (min: number, max: number) => void;
  onGroupByChange: (groupBy?: GroupBy) => void;
  onCardClick: (flowerId: string) => void;
  onAddFlowerClick: () => void;
}

export function CatalogueView({
  flowers,
  groupedFlowers,
  availableColors,
  availableSeasons,
  availableTypes,
  stemLengthBounds,
  vaseLifeBounds,
  currentFilter,
  isLoading,
  isFilterOpen,
  onFilterOpenChange,
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
}: CatalogueViewProps) {
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
          <Dialog.Root open={isFilterOpen} onOpenChange={onFilterOpenChange}>
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
                  onApplyFilters={() => onFilterOpenChange(false)}
                />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        {/* Active filter pills */}
        {hasActiveFilters && (
          <div data-cy="active-filters" className={styles.activeFilters}>
            {currentFilter.colors.map((color) => (
              <div key={color} data-cy="filter-pill" className={styles.pill}>
                {color}
              </div>
            ))}
            {currentFilter.season && (
              <div data-cy="filter-pill" className={styles.pill}>
                {currentFilter.season}
              </div>
            )}
            {currentFilter.type && (
              <div data-cy="filter-pill" className={styles.pill}>
                {currentFilter.type}
              </div>
            )}
            {currentFilter.availability && (
              <div data-cy="filter-pill" className={styles.pill}>
                {currentFilter.availability}
              </div>
            )}
            {currentFilter.fragranceLevel && (
              <div data-cy="filter-pill" className={styles.pill}>
                {currentFilter.fragranceLevel}
              </div>
            )}
            {currentFilter.toxicity && (
              <div data-cy="filter-pill" className={styles.pill}>
                {currentFilter.toxicity}
              </div>
            )}
            {currentFilter.stemLengthRange && (
              <div data-cy="filter-pill" className={styles.pill}>
                {currentFilter.stemLengthRange.min}–{currentFilter.stemLengthRange.max} cm
              </div>
            )}
            {currentFilter.vaseLifeRange && (
              <div data-cy="filter-pill" className={styles.pill}>
                {currentFilter.vaseLifeRange.min}–{currentFilter.vaseLifeRange.max} days
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

      {/* Flower list */}
      <FlowerList
        flowers={flowers}
        onCardClick={onCardClick}
        {...(groupedFlowers ? { groupedFlowers } : {})}
        {...(isLoading !== undefined ? { isLoading } : {})}
      />

      {/* FAB */}
      <button data-cy="add-flower-button" onClick={onAddFlowerClick} className={styles.fab}>
        <PlusIcon width={24} height={24} aria-hidden="true" />
      </button>
    </div>
  );
}
