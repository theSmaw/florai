// Catalogue container
// Connects the Redux store to the catalogue page UI.
// Rendered by CatalogueView (the route target).
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Dialog from '@radix-ui/react-dialog';
import {
  MagnifyingGlassIcon,
  MixerVerticalIcon,
  Cross2Icon,
  PlusIcon,
} from '@radix-ui/react-icons';
import {
  selectFilteredFlowers,
  selectGroupedFlowers,
  selectFlowersFilter,
  selectLoadFlowersStatus,
  selectAllColors,
  selectAllSeasons,
  selectAllTypes,
  selectStemLengthBounds,
  selectVaseLifeBounds,
} from '../../stores/flowers/selectors';
import { filterApplied, flowerSelected } from '../../stores/flowers/slice';
import { loadFlowers } from '../../stores/flowers/asyncActions/loadFlowers';
import type { AppDispatch } from '../../stores/store';
import type {
  Color,
  FlowerType,
  FragranceLevel,
  GroupBy,
  Season,
  Toxicity,
} from '../../domain/Flower';
import { FlowerList } from '../../components/FlowerList/FlowerList';
import { FilterPanel } from '../../components/FilterPanel/FilterPanel';
import styles from '../../views/Catalogue/CatalogueView.module.css';

export function CatalogueContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const filteredFlowers = useSelector(selectFilteredFlowers);
  const groupedFlowers = useSelector(selectGroupedFlowers);
  const currentFilter = useSelector(selectFlowersFilter);
  const loadFlowersStatus = useSelector(selectLoadFlowersStatus);
  const isLoading = loadFlowersStatus.status === 'pending';
  const availableColors = useSelector(selectAllColors);
  const availableSeasons = useSelector(selectAllSeasons);
  const availableTypes = useSelector(selectAllTypes);
  const stemLengthBounds = useSelector(selectStemLengthBounds);
  const vaseLifeBounds = useSelector(selectVaseLifeBounds);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const promise = dispatch(loadFlowers());
    return () => promise.abort();
  }, [dispatch]);

  const handleSearchChange = (searchTerm: string) => {
    if (searchTerm) {
      dispatch(filterApplied({ ...currentFilter, searchTerm }));
    } else {
      const { searchTerm: _omit, ...rest } = currentFilter;
      dispatch(filterApplied(rest));
    }
  };

  const handleColorToggle = (color: Color) => {
    const colors = currentFilter.colors.includes(color)
      ? currentFilter.colors.filter((c) => c !== color)
      : [...currentFilter.colors, color];
    dispatch(filterApplied({ ...currentFilter, colors }));
  };

  const handleAvailabilityChange = (availability?: 'always' | 'seasonal' | 'limited') => {
    const { availability: _omit, ...rest } = currentFilter;
    if (availability) {
      dispatch(filterApplied({ ...rest, availability }));
    } else {
      dispatch(filterApplied(rest));
    }
  };

  const handleSeasonChange = (season?: Season) => {
    const { season: _omit, ...rest } = currentFilter;
    if (season) {
      dispatch(filterApplied({ ...rest, season }));
    } else {
      dispatch(filterApplied(rest));
    }
  };

  const handleTypeChange = (type?: FlowerType) => {
    const { type: _omit, ...rest } = currentFilter;
    if (type) {
      dispatch(filterApplied({ ...rest, type }));
    } else {
      dispatch(filterApplied(rest));
    }
  };

  const handleFragranceLevelChange = (fragranceLevel?: FragranceLevel) => {
    const { fragranceLevel: _omit, ...rest } = currentFilter;
    if (fragranceLevel) {
      dispatch(filterApplied({ ...rest, fragranceLevel }));
    } else {
      dispatch(filterApplied(rest));
    }
  };

  const handleToxicityChange = (toxicity?: Toxicity) => {
    const { toxicity: _omit, ...rest } = currentFilter;
    if (toxicity) {
      dispatch(filterApplied({ ...rest, toxicity }));
    } else {
      dispatch(filterApplied(rest));
    }
  };

  const handleStemLengthChange = (min: number, max: number) => {
    const { stemLengthRange: _omit, ...rest } = currentFilter;
    if (min === stemLengthBounds.min && max === stemLengthBounds.max) {
      dispatch(filterApplied(rest));
    } else {
      dispatch(filterApplied({ ...rest, stemLengthRange: { min, max } }));
    }
  };

  const handleVaseLifeChange = (min: number, max: number) => {
    const { vaseLifeRange: _omit, ...rest } = currentFilter;
    if (min === vaseLifeBounds.min && max === vaseLifeBounds.max) {
      dispatch(filterApplied(rest));
    } else {
      dispatch(filterApplied({ ...rest, vaseLifeRange: { min, max } }));
    }
  };

  const handleGroupByChange = (groupBy?: GroupBy) => {
    const { groupBy: _omit, ...rest } = currentFilter;
    if (groupBy) {
      dispatch(filterApplied({ ...rest, groupBy }));
    } else {
      dispatch(filterApplied(rest));
    }
  };

  const handleCardClick = (flowerId: string) => {
    dispatch(flowerSelected(flowerId));
  };

  const handleAddFlowerClick = () => {};

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
              onChange={(e) => handleSearchChange(e.target.value)}
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
                  onColorToggle={handleColorToggle}
                  onAvailabilityChange={handleAvailabilityChange}
                  onSeasonChange={handleSeasonChange}
                  onTypeChange={handleTypeChange}
                  onFragranceLevelChange={handleFragranceLevelChange}
                  onToxicityChange={handleToxicityChange}
                  onStemLengthChange={handleStemLengthChange}
                  onVaseLifeChange={handleVaseLifeChange}
                  onGroupByChange={handleGroupByChange}
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
        flowers={filteredFlowers}
        onCardClick={handleCardClick}
        {...(groupedFlowers ? { groupedFlowers } : {})}
        {...(isLoading !== undefined ? { isLoading } : {})}
      />

      {/* FAB */}
      <button data-cy="add-flower-button" onClick={handleAddFlowerClick} className={styles.fab}>
        <PlusIcon width={24} height={24} aria-hidden="true" />
      </button>
    </div>
  );
}
