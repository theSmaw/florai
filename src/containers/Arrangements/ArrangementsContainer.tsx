import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectArrangementsFilter,
  selectFilteredArrangements,
  selectGroupedArrangements,
  selectLoadArrangementsStatus,
  selectCreateStatus,
} from '../../stores/arrangements/selectors';
import { arrangementFilterApplied } from '../../stores/arrangements/slice';
import { loadArrangements } from '../../stores/arrangements/asyncActions/loadArrangements';
import { createArrangement } from '../../stores/arrangements/asyncActions/createArrangement';
import { selectFlowersList, selectLoadFlowersStatus } from '../../stores/flowers/selectors';
import { loadFlowers } from '../../stores/flowers/asyncActions/loadFlowers';
import type { AppDispatch, RootState } from '../../stores/store';
import type {
  ArrangementFilter,
  ArrangementOccasion,
  ArrangementSize,
  ArrangementStyle,
  NewArrangement,
} from '../../domain/Arrangement';
import {
  OCCASION_LABEL,
  SIZE_LABEL,
  STYLE_LABEL,
} from '../../domain/Arrangement';
import { Arrangements } from '../../components/Arrangements/Arrangements';

type Pill = { label: string; onClear: () => void };

function pill<T>(value: T | undefined, label: (v: T) => string, onClear: () => void): Pill[] {
  return value !== undefined ? [{ label: label(value), onClear }] : [];
}

export function ArrangementsContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const arrangements = useSelector(selectFilteredArrangements);
  const groupedArrangements = useSelector(selectGroupedArrangements);
  const currentFilter = useSelector(selectArrangementsFilter);
  const loadStatus = useSelector(selectLoadArrangementsStatus);
  const createStatus = useSelector(selectCreateStatus);
  const isLoading = loadStatus.status === 'pending';
  const saving = createStatus.status === 'pending';
  const saveError = useSelector((state: RootState) => {
    const s = state.arrangements.createStatus;
    return s.status === 'rejected' ? s.errorMessage : null;
  });

  const flowers = useSelector(selectFlowersList);
  const flowersLoadStatus = useSelector(selectLoadFlowersStatus);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const saveInitiated = useRef(false);

  useEffect(() => {
    if (!saveInitiated.current) return;
    if (createStatus.status === 'fulfilled') {
      saveInitiated.current = false;
      setIsAddOpen(false);
    } else if (createStatus.status === 'rejected') {
      saveInitiated.current = false;
      // modal stays open so the user sees the error
    }
  }, [createStatus]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (loadStatus.status === 'idle') {
      void dispatch(loadArrangements());
    }
    if (flowersLoadStatus.status === 'idle') {
      const promise = dispatch(loadFlowers());
      return () => promise.abort();
    }
    return undefined;
  }, [dispatch]);

  function handleFilterChange(filter: ArrangementFilter) {
    dispatch(arrangementFilterApplied(filter));
  }

  function handleCardClick(id: string) {
    navigate(`/arrangements/${id}`, { state: { backLabel: 'Arrangements' } });
  }

  function handleAddClick(data: NewArrangement) {
    saveInitiated.current = true;
    void dispatch(createArrangement(data));
  }

  const filterPills: Pill[] = [
    ...pill(currentFilter.size, (s: ArrangementSize) => SIZE_LABEL[s], () => {
      const { size: _omit, ...rest } = currentFilter;
      handleFilterChange(rest);
    }),
    ...pill(currentFilter.style, (s: ArrangementStyle) => STYLE_LABEL[s], () => {
      const { style: _omit, ...rest } = currentFilter;
      handleFilterChange(rest);
    }),
    ...pill(currentFilter.occasion, (o: ArrangementOccasion) => OCCASION_LABEL[o], () => {
      const { occasion: _omit, ...rest } = currentFilter;
      handleFilterChange(rest);
    }),
    ...pill(currentFilter.searchTerm, (s) => `"${s}"`, () => {
      const { searchTerm: _omit, ...rest } = currentFilter;
      handleFilterChange(rest);
    }),
  ];

  return (
    <Arrangements
      arrangements={arrangements}
      groupedArrangements={groupedArrangements}
      currentFilter={currentFilter}
      isLoading={isLoading}
      flowers={flowers}
      onFilterChange={handleFilterChange}
      onCardClick={handleCardClick}
      onAddClick={handleAddClick}
      filterPills={filterPills}
      saving={saving}
      saveError={saveError}
      isAddOpen={isAddOpen}
      onAddOpenChange={setIsAddOpen}
    />
  );
}
