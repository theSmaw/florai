// Catalogue container
// Orchestrates communication between UI, Redux store, and actions
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CatalogueView } from '../../views/Catalogue/CatalogueView';
import {
  selectFilteredFlowers,
  selectGroupedFlowers,
  selectFlowersFilter,
  selectLoadFlowersStatus,
  selectAllColors,
} from '../../stores/flowers/selectors';
import { filterApplied, flowerSelected } from '../../stores/flowers/slice';
import { loadFlowers } from '../../stores/flowers/asyncActions/loadFlowers';
import type { AppDispatch } from '../../stores/store';

export function CatalogueContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const filteredFlowers = useSelector(selectFilteredFlowers);
  const groupedFlowers = useSelector(selectGroupedFlowers);
  const currentFilter = useSelector(selectFlowersFilter);
  const loadFlowersStatus = useSelector(selectLoadFlowersStatus);
  const isLoading = loadFlowersStatus.status === 'pending';
  const availableColors = useSelector(selectAllColors);

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
  };

  const handleAddFlowerClick = () => {};

  return (
    <CatalogueView
      flowers={filteredFlowers}
      groupedFlowers={groupedFlowers}
      availableColors={availableColors}
      currentFilter={currentFilter}
      isLoading={isLoading}
      isFilterOpen={isFilterOpen}
      onFilterOpenChange={setIsFilterOpen}
      onSearchChange={handleSearchChange}
      onColorToggle={handleColorToggle}
      onAvailabilityChange={handleAvailabilityChange}
      onGroupByChange={handleGroupByChange}
      onCardClick={handleCardClick}
      onAddFlowerClick={handleAddFlowerClick}
    />
  );
}
