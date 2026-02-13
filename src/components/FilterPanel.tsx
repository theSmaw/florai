// Filter panel component
// Pure UI - handles filter display and events, no store access
import type { FlowerFilter } from '../domain/Flower';

interface FilterPanelProps {
  availableColors: string[];
  currentFilter: FlowerFilter;
  onSearchChange: (searchTerm: string) => void;
  onColorToggle: (color: string) => void;
  onAvailabilityChange: (availability?: 'always' | 'seasonal' | 'limited') => void;
  onGroupByChange: (groupBy?: 'color' | 'type' | 'none') => void;
  onApplyFilters: () => void;
}

export function FilterPanel({
  availableColors,
  currentFilter,
  onSearchChange,
  onColorToggle,
  onAvailabilityChange,
  onGroupByChange,
  onApplyFilters,
}: FilterPanelProps) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
          Search
        </label>
        <div className="relative">
          <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
            search
          </span>
          <input
            type="text"
            placeholder="Search flowers..."
            value={currentFilter.searchTerm || ''}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white dark:bg-slate-800 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
        </div>
      </div>

      {/* Colors */}
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
          Colors
        </label>
        <div className="flex flex-wrap gap-2">
          {availableColors.map((color) => (
            <button
              key={color}
              onClick={() => onColorToggle(color)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                currentFilter.colors.includes(color)
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
          Availability
        </label>
        <div className="space-y-2">
          {['always', 'seasonal', 'limited'].map((avail) => (
            <label
              key={avail}
              className="flex items-center gap-2 cursor-pointer text-sm text-slate-600 dark:text-slate-400"
            >
              <input
                type="radio"
                name="availability"
                value={avail}
                checked={currentFilter.availability === (avail as any)}
                onChange={() => onAvailabilityChange(avail as any)}
                className="w-4 h-4"
              />
              <span className="capitalize">{avail}</span>
            </label>
          ))}
          <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600 dark:text-slate-400">
            <input
              type="radio"
              name="availability"
              checked={!currentFilter.availability}
              onChange={() => onAvailabilityChange(undefined)}
              className="w-4 h-4"
            />
            <span>All</span>
          </label>
        </div>
      </div>

      {/* Group By */}
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
          Group By
        </label>
        <div className="space-y-2">
          {['none', 'color', 'type'].map((group) => (
            <label
              key={group}
              className="flex items-center gap-2 cursor-pointer text-sm text-slate-600 dark:text-slate-400"
            >
              <input
                type="radio"
                name="groupBy"
                value={group}
                checked={(currentFilter.groupBy || 'none') === group}
                onChange={() => onGroupByChange(group as any)}
                className="w-4 h-4"
              />
              <span className="capitalize">{group}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={onApplyFilters}
        className="w-full bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
}

