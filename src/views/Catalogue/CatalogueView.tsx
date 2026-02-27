/**
 * Catalogue view component
 * Pure UI - displays the catalogue header, search, filters, and flower list
 */
import * as Dialog from '@radix-ui/react-dialog';
import {
  BellIcon,
  MagnifyingGlassIcon,
  MixerVerticalIcon,
  Cross2Icon,
  PlusIcon,
} from '@radix-ui/react-icons';
import type { Flower, FlowerFilter } from '../../domain/Flower';
import { FlowerList } from '../../components/FlowerList/FlowerList.tsx';
import { HeaderMenu } from '../../components/HeaderMenu/HeaderMenu.tsx';
import { UserMenu } from '../../components/UserMenu/UserMenu.tsx';
import { FilterPanel } from '../../components/FilterPanel/FilterPanel.tsx';
import styles from './CatalogueView.module.css';

interface CatalogueViewProps {
  flowers: Flower[];
  groupedFlowers?: Record<string, Flower[]>;
  availableColors: string[];
  currentFilter: FlowerFilter;
  isLoading?: boolean;
  isFilterOpen: boolean;
  onFilterOpenChange: (open: boolean) => void;
  onSearchChange: (searchTerm: string) => void;
  onColorToggle: (color: string) => void;
  onAvailabilityChange: (availability?: 'always' | 'seasonal' | 'limited') => void;
  onGroupByChange: (groupBy?: 'color' | 'type' | 'none') => void;
  onCardClick: (flowerId: string) => void;
  onAddFlowerClick: () => void;
}

export function CatalogueView({
  flowers,
  groupedFlowers,
  availableColors,
  currentFilter,
  isLoading,
  isFilterOpen,
  onFilterOpenChange,
  onSearchChange,
  onColorToggle,
  onAvailabilityChange,
  onGroupByChange,
  onCardClick,
  onAddFlowerClick,
}: CatalogueViewProps) {
  const hasActiveFilters =
    currentFilter.colors.length > 0 || !!currentFilter.availability || !!currentFilter.searchTerm;

  return (
    <div data-cy="catalogue-view" className={styles.root}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Catalogue</h1>
          <div className={styles.iconButtons}>
            <HeaderMenu />
            <button className={styles.iconButton} aria-label="Notifications">
              <BellIcon width={20} height={20} aria-hidden="true" />
            </button>
            <UserMenu />
          </div>
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
                  currentFilter={currentFilter}
                  onColorToggle={onColorToggle}
                  onAvailabilityChange={onAvailabilityChange}
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
