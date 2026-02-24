// Catalogue container
// Orchestrates communication between UI, Redux store, and actions
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CatalogueView } from '../../views/Catalogue/CatalogueView';
import {
  selectFilteredFlowers,
  selectGroupedFlowers,
  selectFlowersFilter,
  selectFlowersIsLoading,
  selectAllColors,
} from '../../stores/flowers/selectors';
import {
  filterApplied,
  flowerSelected,
  loadingStarted,
  flowersLoaded,
  loadingFailed,
} from '../../stores/flowers/slice';
import type { AppDispatch } from '../../stores/store';
import { fetchFlowers } from '../../api/fetchFlowers';

export function CatalogueContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const filteredFlowers = useSelector(selectFilteredFlowers);
  const groupedFlowers = useSelector(selectGroupedFlowers);
  const currentFilter = useSelector(selectFlowersFilter);
  const isLoading = useSelector(selectFlowersIsLoading);
  const availableColors = useSelector(selectAllColors);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    dispatch(loadingStarted());
    fetchFlowers(controller.signal)
      .then((data) => dispatch(flowersLoaded(data)))
      .catch((err: any) => {
        if (err && err.name === 'AbortError') return;
        dispatch(loadingFailed(err?.message || 'Failed to load flowers'));
        console.error('Failed to fetch flowers', err);
      });

    return () => controller.abort();
  }, [dispatch]);

  const handleSearchChange = (searchTerm: string) => {
    if (searchTerm) {
      const newFilter = { ...currentFilter, searchTerm };
      dispatch(filterApplied(newFilter));
    } else {
      const { searchTerm: _omit, ...rest } = currentFilter;
      dispatch(filterApplied(rest));
    }
  };

  const handleColorToggle = (color: string) => {
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

  const handleGroupByChange = (groupBy?: 'color' | 'type' | 'none') => {
    const { groupBy: _omit, ...rest } = currentFilter;
    if (groupBy) {
      dispatch(filterApplied({ ...rest, groupBy }));
    } else {
      dispatch(filterApplied(rest));
    }
  };

  const handleCardClick = (flowerId: string) => {
    dispatch(flowerSelected(flowerId));
    // In a full app, this would navigate to the detail page
    console.log('Selected flower:', flowerId);
  };

  const handleAddFlowerClick = () => {
    console.log('Add flower clicked');
    // In a full app, this would navigate to the add/edit page
  };

  return (
    <CatalogueView
      flowers={filteredFlowers}
      groupedFlowers={groupedFlowers}
      availableColors={availableColors}
      currentFilter={currentFilter}
      isLoading={isLoading}
      isFilterOpen={isFilterOpen}
      onSearchChange={handleSearchChange}
      onFilterClick={() => setIsFilterOpen(!isFilterOpen)}
      onColorToggle={handleColorToggle}
      onAvailabilityChange={handleAvailabilityChange}
      onGroupByChange={handleGroupByChange}
      onApplyFilters={() => setIsFilterOpen(false)}
      onCardClick={handleCardClick}
      onAddFlowerClick={handleAddFlowerClick}
    />
  );
}
