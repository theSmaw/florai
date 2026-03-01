// Catalogue container
// Connects the Redux store to the catalogue page UI.
// Rendered by CatalogueView (the route target).
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectFilteredFlowers,
  selectGroupedFlowers,
  selectFlowersFilter,
  selectLoadFlowersStatus,
  selectAllColors,
  selectAllSeasons,
  selectAllTypes,
  selectAllClimates,
  selectStemLengthBounds,
  selectVaseLifeBounds,
} from '../../stores/flowers/selectors';
import { filterApplied, flowerSelected } from '../../stores/flowers/slice';
import { loadFlowers } from '../../stores/flowers/asyncActions/loadFlowers';
import type { AppDispatch } from '../../stores/store';
import type {
  Climate,
  Color,
  FlowerType,
  FragranceLevel,
  GroupBy,
  Season,
  Toxicity,
} from '../../domain/Flower';
import { AVAILABILITY_LABEL, CLIMATE_LABEL, FRAGRANCE_LABEL, TOXICITY_LABEL } from '../../domain/flowerDisplayMeta';
import { Catalogue } from '../../components/Catalogue/Catalogue';

type Pill = { label: string; onClear: () => void };

/** Returns a single-item pill array when value is present, otherwise empty. */
function pill<T>(value: T | undefined, label: (v: T) => string, onClear: () => void): Pill[] {
  return value !== undefined ? [{ label: label(value), onClear }] : [];
}

export function CatalogueContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const filteredFlowers = useSelector(selectFilteredFlowers);
  const groupedFlowers = useSelector(selectGroupedFlowers);
  const currentFilter = useSelector(selectFlowersFilter);
  const loadFlowersStatus = useSelector(selectLoadFlowersStatus);
  const isLoading = loadFlowersStatus.status === 'pending';
  const availableColors = useSelector(selectAllColors);
  const availableSeasons = useSelector(selectAllSeasons);
  const availableTypes = useSelector(selectAllTypes);
  const availableClimates = useSelector(selectAllClimates);
  const stemLengthBounds = useSelector(selectStemLengthBounds);
  const vaseLifeBounds = useSelector(selectVaseLifeBounds);

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

  const handleClimateChange = (climate?: Climate) => {
    const { climate: _omit, ...rest } = currentFilter;
    if (climate) {
      dispatch(filterApplied({ ...rest, climate }));
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
    navigate(`/catalogue/${flowerId}`);
  };

  const handleAddFlowerClick = () => {};

  const filterPills: Pill[] = [
    ...currentFilter.colors.map((c) => ({ label: c, onClear: () => handleColorToggle(c) })),
    ...pill(currentFilter.season, (s) => s, () => handleSeasonChange(undefined)),
    ...pill(currentFilter.type, (t) => t, () => handleTypeChange(undefined)),
    ...pill(currentFilter.climate, (c) => CLIMATE_LABEL[c], () => handleClimateChange(undefined)),
    ...pill(currentFilter.availability, (a) => AVAILABILITY_LABEL[a], () => handleAvailabilityChange(undefined)),
    ...pill(currentFilter.fragranceLevel, (f) => FRAGRANCE_LABEL[f], () => handleFragranceLevelChange(undefined)),
    ...pill(currentFilter.toxicity, (t) => TOXICITY_LABEL[t], () => handleToxicityChange(undefined)),
    ...pill(currentFilter.stemLengthRange, (r) => `${r.min}–${r.max} cm`, () => handleStemLengthChange(stemLengthBounds.min, stemLengthBounds.max)),
    ...pill(currentFilter.vaseLifeRange, (r) => `${r.min}–${r.max} days`, () => handleVaseLifeChange(vaseLifeBounds.min, vaseLifeBounds.max)),
    ...pill(currentFilter.searchTerm, (s) => `"${s}"`, () => handleSearchChange('')),
  ];

  return (
    <Catalogue
      flowers={filteredFlowers}
      groupedFlowers={groupedFlowers}
      currentFilter={currentFilter}
      isLoading={isLoading}
      availableColors={availableColors}
      availableSeasons={availableSeasons}
      availableTypes={availableTypes}
      availableClimates={availableClimates}
      stemLengthBounds={stemLengthBounds}
      vaseLifeBounds={vaseLifeBounds}
      onSearchChange={handleSearchChange}
      onColorToggle={handleColorToggle}
      onAvailabilityChange={handleAvailabilityChange}
      onSeasonChange={handleSeasonChange}
      onTypeChange={handleTypeChange}
      onClimateChange={handleClimateChange}
      onFragranceLevelChange={handleFragranceLevelChange}
      onToxicityChange={handleToxicityChange}
      onStemLengthChange={handleStemLengthChange}
      onVaseLifeChange={handleVaseLifeChange}
      onGroupByChange={handleGroupByChange}
      onCardClick={handleCardClick}
      onAddFlowerClick={handleAddFlowerClick}
      filterPills={filterPills}
    />
  );
}
