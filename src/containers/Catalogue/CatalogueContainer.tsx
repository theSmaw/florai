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
  selectAllSeasons,
  selectAllTypes,
  selectStemLengthBounds,
  selectVaseLifeBounds,
} from '../../stores/flowers/selectors';
import { filterApplied, flowerSelected } from '../../stores/flowers/slice';
import { loadFlowers } from '../../stores/flowers/asyncActions/loadFlowers';
import type { AppDispatch } from '../../stores/store';
import type { Color, FragranceLevel, GroupBy, Season, Toxicity } from '../../domain/Flower';

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

  const handleTypeChange = (type?: string) => {
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

  return (
    <CatalogueView
      flowers={filteredFlowers}
      groupedFlowers={groupedFlowers}
      availableColors={availableColors}
      availableSeasons={availableSeasons}
      availableTypes={availableTypes}
      stemLengthBounds={stemLengthBounds}
      vaseLifeBounds={vaseLifeBounds}
      currentFilter={currentFilter}
      isLoading={isLoading}
      isFilterOpen={isFilterOpen}
      onFilterOpenChange={setIsFilterOpen}
      onSearchChange={handleSearchChange}
      onColorToggle={handleColorToggle}
      onAvailabilityChange={handleAvailabilityChange}
      onSeasonChange={handleSeasonChange}
      onTypeChange={handleTypeChange}
      onFragranceLevelChange={handleFragranceLevelChange}
      onToxicityChange={handleToxicityChange}
      onStemLengthChange={handleStemLengthChange}
      onVaseLifeChange={handleVaseLifeChange}
      onGroupByChange={handleGroupByChange}
      onCardClick={handleCardClick}
      onAddFlowerClick={handleAddFlowerClick}
    />
  );
}
