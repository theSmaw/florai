// Catalogue view component
// Pure UI - displays the catalogue header, search, filters, and flower list
import type { Flower, FlowerFilter } from '../domain/Flower';
import { FlowerList } from '../components/FlowerList';

interface CatalogueViewProps {
  flowers: Flower[];
  groupedFlowers?: Record<string, Flower[]>;
  availableColors: string[];
  currentFilter: FlowerFilter;
  isLoading?: boolean;
  isFilterOpen?: boolean;
  onSearchChange: (searchTerm: string) => void;
  onFilterClick: () => void;
  onCardClick: (flowerId: string) => void;
  onAddFlowerClick: () => void;
}

export function CatalogueView({
  flowers,
  groupedFlowers,
  currentFilter,
  isLoading,
  onSearchChange,
  onFilterClick,
  onCardClick,
  onAddFlowerClick,
}: CatalogueViewProps) {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Header Section */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 pt-6 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Catalogue
          </h1>
          <div className="flex gap-2">
            <button className="p-2 bg-emerald-500/10 text-emerald-500 rounded-full hover:bg-emerald-500/20 transition-colors">
              <span className="material-icons">notifications_none</span>
            </button>
            <button className="p-2 bg-emerald-500/10 text-emerald-500 rounded-full hover:bg-emerald-500/20 transition-colors">
              <span className="material-icons">account_circle</span>
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
              search
            </span>
            <input
              type="text"
              value={currentFilter.searchTerm || ''}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-emerald-500 shadow-sm"
              placeholder="Search flowers..."
            />
          </div>
          <button
            onClick={onFilterClick}
            className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-colors"
          >
            <span className="material-icons text-lg">tune</span>
            <span>Filter</span>
          </button>
        </div>

        {/* Active Filters Display */}
        {(currentFilter.colors.length > 0 ||
          currentFilter.availability ||
          currentFilter.searchTerm) && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar mt-4 pb-1">
            {currentFilter.colors.map((color: string) => (
              <div
                key={color}
                className="flex-shrink-0 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold"
              >
                {color}
              </div>
            ))}
            {currentFilter.availability && (
              <div className="flex-shrink-0 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold">
                {currentFilter.availability}
              </div>
            )}
            {currentFilter.searchTerm && (
              <div className="flex-shrink-0 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold">
                {currentFilter.searchTerm}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <FlowerList
        flowers={flowers}
        groupedFlowers={groupedFlowers}
        onCardClick={onCardClick}
        isLoading={isLoading}
      />

      {/* Floating Action Button */}
      <button
        onClick={onAddFlowerClick}
        className="fixed bottom-24 right-6 w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 active:scale-95 transition-transform z-40 hover:bg-emerald-600"
      >
        <span className="material-icons text-3xl">add</span>
      </button>

      {/* Navigation Bar (iOS Style) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-40">
        <div className="flex flex-col items-center gap-1 text-emerald-500">
          <span className="material-icons">local_florist</span>
          <span className="text-[10px] font-medium">Catalogue</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer">
          <span className="material-icons">inventory_2</span>
          <span className="text-[10px] font-medium">Inventory</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer">
          <span className="material-icons">analytics</span>
          <span className="text-[10px] font-medium">Stats</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer">
          <span className="material-icons">settings</span>
          <span className="text-[10px] font-medium">Settings</span>
        </div>
      </nav>
    </div>
  );
}

