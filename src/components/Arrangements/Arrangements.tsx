import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  Cross2Icon,
  MagnifyingGlassIcon,
  MixerVerticalIcon,
  PlusIcon,
} from '@radix-ui/react-icons';
import type {
  Arrangement,
  ArrangementFilter,
  ArrangementOccasion,
  ArrangementSize,
  ArrangementStyle,
  NewArrangement,
} from '../../domain/Arrangement';
import type { Flower } from '../../domain/Flower';
import { ArrangementCard } from '../ArrangementCard/ArrangementCard';
import { ArrangementFilterPanel } from '../ArrangementFilterPanel/ArrangementFilterPanel';
import { FilterChip } from '../FilterChip/FilterChip';
import { SheetTitle } from '../SheetTitle/SheetTitle';
import { AddArrangementModal } from '../AddArrangementModal/AddArrangementModal';
import styles from './Arrangements.module.css';

export interface ArrangementsProps {
  arrangements: Arrangement[];
  groupedArrangements: Record<string, Arrangement[]>;
  currentFilter: ArrangementFilter;
  isLoading: boolean;
  flowers: Flower[];
  onFilterChange: (filter: ArrangementFilter) => void;
  onCardClick: (id: string) => void;
  onAddClick: (data: NewArrangement) => void;
  filterPills: Array<{ label: string; onClear: () => void }>;
  saving: boolean;
  saveError: string | null;
  isAddOpen: boolean;
  onAddOpenChange: (open: boolean) => void;
}


export function Arrangements({
  arrangements,
  groupedArrangements,
  currentFilter,
  isLoading,
  flowers,
  onFilterChange,
  onCardClick,
  onAddClick,
  filterPills,
  saving,
  saveError,
  isAddOpen,
  onAddOpenChange,
}: ArrangementsProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const hasActiveFilters = filterPills.length > 0;

  function handleSearchChange(searchTerm: string) {
    if (searchTerm) {
      onFilterChange({ ...currentFilter, searchTerm });
    } else {
      const { searchTerm: _omit, ...rest } = currentFilter;
      onFilterChange(rest);
    }
  }

  function handleSizeChange(size?: ArrangementSize) {
    const { size: _omit, ...rest } = currentFilter;
    onFilterChange(size ? { ...rest, size } : rest);
  }

  function handleStyleChange(style?: ArrangementStyle) {
    const { style: _omit, ...rest } = currentFilter;
    onFilterChange(style ? { ...rest, style } : rest);
  }

  function handleOccasionChange(occasion?: ArrangementOccasion) {
    const { occasion: _omit, ...rest } = currentFilter;
    onFilterChange(occasion ? { ...rest, occasion } : rest);
  }

  function handleGroupByChange(groupBy?: 'size' | 'occasion') {
    const { groupBy: _omit, ...rest } = currentFilter;
    onFilterChange(groupBy ? { ...rest, groupBy } : rest);
  }

  function handleAddSave(data: NewArrangement) {
    onAddClick(data);
    // Modal stays open while saving — container closes it on fulfilled
  }

  const groupKeys = Object.keys(groupedArrangements);
  const showGroups = groupKeys.length > 1 || (groupKeys.length === 1 && groupKeys[0] !== 'All');

  return (
    <div className={styles.root}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <h1 data-cy="page-title" className={styles.title}>Arrangements</h1>
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
              data-cy="arrangements-search-input"
              type="text"
              value={currentFilter.searchTerm ?? ''}
              onChange={(e) => handleSearchChange(e.target.value)}
              className={styles.searchInput}
              placeholder="Search arrangements..."
            />
          </div>

          <Dialog.Root open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <Dialog.Trigger asChild>
              <button data-cy="arrangements-filter-button" className={styles.filterButton}>
                <MixerVerticalIcon width={16} height={16} aria-hidden="true" />
                <span>Filter</span>
                {hasActiveFilters && <span className={styles.filterBadge} />}
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className={styles.overlay} />
              <Dialog.Content className={styles.sheet} aria-describedby={undefined}>
                <div className={styles.sheetHeader}>
                  <Dialog.Title asChild><SheetTitle>Filters</SheetTitle></Dialog.Title>
                  <Dialog.Close asChild>
                    <button className={styles.closeButton} aria-label="Close filters">
                      <Cross2Icon width={15} height={15} aria-hidden="true" />
                    </button>
                  </Dialog.Close>
                </div>

                <ArrangementFilterPanel
                  currentFilter={currentFilter}
                  onSizeChange={handleSizeChange}
                  onStyleChange={handleStyleChange}
                  onOccasionChange={handleOccasionChange}
                  onGroupByChange={handleGroupByChange}
                  onApply={() => setIsFilterOpen(false)}
                />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        {/* Active filter pills */}
        {hasActiveFilters && (
          <div data-cy="arrangements-active-filters" className={styles.activeFilters}>
            {filterPills.map((pill) => (
              <FilterChip
                key={pill.label}
                label={pill.label}
                selected
                showClearIcon
                onClick={pill.onClear}
                dataCy="arrangements-filter-pill"
              />
            ))}
          </div>
        )}
      </header>

      {/* Main content */}
      <main data-cy="arrangements-main" className={styles.main}>
        {isLoading ? (
          <div data-cy="arrangements-loading" className={styles.loading}>
            <span className={styles.loadingText}>Loading…</span>
          </div>
        ) : arrangements.length === 0 ? (
          <div data-cy="arrangements-empty" className={styles.empty}>
            <p className={styles.emptyText}>No arrangements yet. Tap + to add your first.</p>
          </div>
        ) : (
          <div className={styles.content}>
            {showGroups
              ? groupKeys.map((groupKey) => (
                  <div key={groupKey} className={styles.group}>
                    <h2 className={styles.groupTitle}>{groupKey}</h2>
                    <div data-cy="arrangement-grid" className={styles.grid}>
                      {(groupedArrangements[groupKey] ?? []).map((arr) => (
                        <ArrangementCard
                          key={arr.id}
                          arrangement={arr}
                          flowers={flowers}
                          onClick={onCardClick}
                        />
                      ))}
                    </div>
                  </div>
                ))
              : groupKeys.map((groupKey) => (
                  <div key={groupKey} data-cy="arrangement-grid" className={styles.grid}>
                    {(groupedArrangements[groupKey] ?? []).map((arr) => (
                      <ArrangementCard
                        key={arr.id}
                        arrangement={arr}
                        flowers={flowers}
                        onClick={onCardClick}
                      />
                    ))}
                  </div>
                ))}
          </div>
        )}
      </main>

      {/* Floating action button */}
      <button
        data-cy="add-arrangement-button"
        className={styles.addButton}
        onClick={() => onAddOpenChange(true)}
        aria-label="Add arrangement"
      >
        <PlusIcon width={24} height={24} aria-hidden="true" />
      </button>

      {/* Add arrangement modal */}
      <AddArrangementModal
        open={isAddOpen}
        onOpenChange={onAddOpenChange}
        flowers={flowers}
        saving={saving}
        error={saveError}
        onSave={handleAddSave}
      />
    </div>
  );
}
