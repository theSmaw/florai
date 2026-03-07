import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  Cross2Icon,
  MagnifyingGlassIcon,
  MixerVerticalIcon,
  PlusIcon,
} from '@radix-ui/react-icons';
import type { Arrangement, ArrangementFilter, ArrangementOccasion, ArrangementSize, ArrangementStyle, NewArrangement } from '../../domain/Arrangement';
import {
  OCCASION_LABEL,
  SIZE_LABEL,
  STYLE_LABEL,
} from '../../domain/Arrangement';
import type { Flower } from '../../domain/Flower';
import { ArrangementCard } from '../ArrangementCard/ArrangementCard';
import { FilterChip } from '../FilterChip/FilterChip';
import { AddArrangementModal } from '../AddArrangementModal/AddArrangementModal';
import styles from './Collection.module.css';

export interface CollectionProps {
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

const SIZES: ArrangementSize[] = ['small', 'medium', 'large', 'extra-large'];
const STYLES: ArrangementStyle[] = ['romantic', 'rustic', 'modern', 'wild', 'classic', 'contemporary'];
const OCCASIONS: ArrangementOccasion[] = ['wedding', 'birthday', 'funeral', 'everyday', 'sympathy', 'anniversary'];

export function Collection({
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
}: CollectionProps) {
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
    if (size) {
      onFilterChange({ ...rest, size });
    } else {
      onFilterChange(rest);
    }
  }

  function handleStyleChange(style?: ArrangementStyle) {
    const { style: _omit, ...rest } = currentFilter;
    if (style) {
      onFilterChange({ ...rest, style });
    } else {
      onFilterChange(rest);
    }
  }

  function handleOccasionChange(occasion?: ArrangementOccasion) {
    const { occasion: _omit, ...rest } = currentFilter;
    if (occasion) {
      onFilterChange({ ...rest, occasion });
    } else {
      onFilterChange(rest);
    }
  }

  function handleGroupByChange(groupBy?: ArrangementFilter['groupBy']) {
    const { groupBy: _omit, ...rest } = currentFilter;
    if (groupBy) {
      onFilterChange({ ...rest, groupBy });
    } else {
      onFilterChange(rest);
    }
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
          <h1 data-cy="page-title" className={styles.title}>Collection</h1>
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
              data-cy="collection-search-input"
              type="text"
              value={currentFilter.searchTerm ?? ''}
              onChange={(e) => handleSearchChange(e.target.value)}
              className={styles.searchInput}
              placeholder="Search arrangements..."
            />
          </div>

          <Dialog.Root open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <Dialog.Trigger asChild>
              <button data-cy="collection-filter-button" className={styles.filterButton}>
                <MixerVerticalIcon width={16} height={16} aria-hidden="true" />
                <span>Filter</span>
                {hasActiveFilters && <span className={styles.filterBadge} />}
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className={styles.overlay} />
              <Dialog.Content className={styles.sheet} aria-describedby={undefined}>
                <div className={styles.sheetHeader}>
                  <Dialog.Title className={styles.sheetTitle}>Filters</Dialog.Title>
                  <Dialog.Close asChild>
                    <button className={styles.closeButton} aria-label="Close filters">
                      <Cross2Icon width={15} height={15} aria-hidden="true" />
                    </button>
                  </Dialog.Close>
                </div>

                <div className={styles.filterBody}>
                  {/* Size */}
                  <div className={styles.filterSection}>
                    <span className={styles.filterLabel}>Size</span>
                    <div className={styles.filterOptions}>
                      <button
                        type="button"
                        className={!currentFilter.size ? `${styles.filterOption} ${styles.filterOptionActive}` : styles.filterOption}
                        onClick={() => handleSizeChange(undefined)}
                      >
                        All
                      </button>
                      {SIZES.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className={currentFilter.size === s ? `${styles.filterOption} ${styles.filterOptionActive}` : styles.filterOption}
                          onClick={() => handleSizeChange(s)}
                        >
                          {SIZE_LABEL[s]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Style */}
                  <div className={styles.filterSection}>
                    <span className={styles.filterLabel}>Style</span>
                    <div className={styles.filterOptions}>
                      <button
                        type="button"
                        className={!currentFilter.style ? `${styles.filterOption} ${styles.filterOptionActive}` : styles.filterOption}
                        onClick={() => handleStyleChange(undefined)}
                      >
                        All
                      </button>
                      {STYLES.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className={currentFilter.style === s ? `${styles.filterOption} ${styles.filterOptionActive}` : styles.filterOption}
                          onClick={() => handleStyleChange(s)}
                        >
                          {STYLE_LABEL[s]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Occasion */}
                  <div className={styles.filterSection}>
                    <span className={styles.filterLabel}>Occasion</span>
                    <div className={styles.filterOptions}>
                      <button
                        type="button"
                        className={!currentFilter.occasion ? `${styles.filterOption} ${styles.filterOptionActive}` : styles.filterOption}
                        onClick={() => handleOccasionChange(undefined)}
                      >
                        All
                      </button>
                      {OCCASIONS.map((occ) => (
                        <button
                          key={occ}
                          type="button"
                          className={currentFilter.occasion === occ ? `${styles.filterOption} ${styles.filterOptionActive}` : styles.filterOption}
                          onClick={() => handleOccasionChange(occ)}
                        >
                          {OCCASION_LABEL[occ]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Group by */}
                  <div className={styles.filterSection}>
                    <span className={styles.filterLabel}>Group by</span>
                    <div className={styles.filterOptions}>
                      {(['none', 'size', 'occasion'] as const).map((g) => (
                        <button
                          key={g}
                          type="button"
                          className={(currentFilter.groupBy ?? 'none') === g ? `${styles.filterOption} ${styles.filterOptionActive}` : styles.filterOption}
                          onClick={() => handleGroupByChange(g === 'none' ? undefined : g)}
                        >
                          {g === 'none' ? 'None' : g === 'size' ? 'Size' : 'Occasion'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Dialog.Close asChild>
                    <button className={styles.applyButton}>Apply</button>
                  </Dialog.Close>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        {/* Active filter pills */}
        {hasActiveFilters && (
          <div data-cy="collection-active-filters" className={styles.activeFilters}>
            {filterPills.map((pill) => (
              <FilterChip
                key={pill.label}
                label={pill.label}
                selected
                showClearIcon
                onClick={pill.onClear}
                dataCy="collection-filter-pill"
              />
            ))}
          </div>
        )}
      </header>

      {/* Main content */}
      <main data-cy="collection-main" className={styles.main}>
        {isLoading ? (
          <div data-cy="collection-loading" className={styles.loading}>
            <span className={styles.loadingText}>Loading…</span>
          </div>
        ) : arrangements.length === 0 ? (
          <div data-cy="collection-empty" className={styles.empty}>
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

      {/* FAB */}
      <button
        data-cy="add-arrangement-button"
        className={styles.fab}
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
