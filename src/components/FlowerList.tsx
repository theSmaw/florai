// Flower list component
// Pure UI - displays flowers in a grid, no business logic
import type { Flower } from '../domain/Flower';
import { FlowerCard } from './FlowerCard';

interface FlowerListProps {
  flowers: Flower[];
  groupedFlowers?: Record<string, Flower[]>;
  onCardClick: (flowerId: string) => void;
  isLoading?: boolean;
}

export function FlowerList({
  flowers,
  groupedFlowers,
  onCardClick,
  isLoading,
}: FlowerListProps) {
  if (isLoading) {
    return (
      <div className="px-4 mt-2 flex items-center justify-center min-h-64">
        <p className="text-slate-500 dark:text-slate-400">Loading flowers...</p>
      </div>
    );
  }

  // If grouped, show groups; otherwise show flat list
  if (groupedFlowers) {
    return (
      <main className="px-4 mt-2 pb-24">
        {Object.entries(groupedFlowers).map(([groupName, groupFlowers]) => (
          <div key={groupName} className="mb-6">
            <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3 px-1">
              {groupName}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {groupFlowers.map((flower) => (
                <FlowerCard key={flower.id} flower={flower} onCardClick={onCardClick} />
              ))}
            </div>
          </div>
        ))}
        {Object.keys(groupedFlowers).length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400">No flowers found</p>
          </div>
        )}
      </main>
    );
  }

  // Flat list
  if (flowers.length === 0) {
    return (
      <main className="px-4 mt-2">
        <div className="text-center py-12">
          <p className="text-slate-500 dark:text-slate-400">No flowers found</p>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 mt-2 pb-24">
      <div className="grid grid-cols-2 gap-4">
        {flowers.map((flower) => (
          <FlowerCard key={flower.id} flower={flower} onCardClick={onCardClick} />
        ))}
      </div>
    </main>
  );
}

