// Catalogue container
// Orchestrates communication between UI, Redux store, and actions
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CatalogueView } from '../views/CatalogueView';
import {
  selectFilteredFlowers,
  selectGroupedFlowers,
  selectFlowersFilter,
  selectFlowersIsLoading,
  filterApplied,
  flowerSelected,
} from '../stores/flowers';
import type { AppDispatch } from '../stores';

export function CatalogueContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const filteredFlowers = useSelector(selectFilteredFlowers);
  const groupedFlowers = useSelector(selectGroupedFlowers);
  const currentFilter = useSelector(selectFlowersFilter);
  const isLoading = useSelector(selectFlowersIsLoading);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearchChange = (searchTerm: string) => {
    const newFilter = {
      ...currentFilter,
      searchTerm: searchTerm || undefined,
    };
    dispatch(filterApplied(newFilter));
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
      availableColors={[]}
      currentFilter={currentFilter}
      isLoading={isLoading}
      isFilterOpen={isFilterOpen}
      onSearchChange={handleSearchChange}
      onFilterClick={() => setIsFilterOpen(!isFilterOpen)}
      onCardClick={handleCardClick}
      onAddFlowerClick={handleAddFlowerClick}
    />
  );
}

