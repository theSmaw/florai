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
