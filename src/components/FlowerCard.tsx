// Reusable flower card component
// Pure UI - no business logic or store access
import type { Flower } from '../domain/Flower';

interface FlowerCardProps {
  flower: Flower;
  onCardClick: (flowerId: string) => void;
}

export function FlowerCard({ flower, onCardClick }: FlowerCardProps) {
  const isOutOfStock = flower.quantityOnHand === 0;
  const colorDot = flower.color[0] || 'gray';

  // Map color names to Tailwind classes
  const colorClasses: Record<string, string> = {
    pink: 'bg-pink-400',
    red: 'bg-red-600',
    blue: 'bg-blue-400',
    yellow: 'bg-yellow-400',
    purple: 'bg-purple-400',
    white: 'bg-white',
    orange: 'bg-orange-400',
    green: 'bg-green-400',
  };

  const colorClass = colorClasses[colorDot.toLowerCase()] || 'bg-gray-400';

  return (
    <button
      onClick={() => onCardClick(flower.id)}
      className={`bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 text-left transition-opacity ${
        isOutOfStock ? 'opacity-60' : ''
      }`}
    >
      <div className="relative aspect-square">
        <img
          src="https://via.placeholder.com/300"
          alt={flower.name}
          className={`w-full h-full object-cover ${isOutOfStock ? 'grayscale' : ''}`}
        />
        {isOutOfStock ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
              OUT OF STOCK
            </span>
          </div>
        ) : (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 px-2 py-1 rounded-full text-[10px] font-bold text-emerald-500">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            STOCK: {flower.quantityOnHand}
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-sm leading-tight text-slate-800 dark:text-slate-100">
            {flower.name}
          </h3>
          <div
            className={`w-3 h-3 rounded-full ${colorClass} ring-1 ring-slate-200 dark:ring-slate-600`}
          ></div>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
          {flower.season.length > 0 ? flower.season[0] : 'Year-round'}
        </p>
        <div className="flex items-center justify-between">
          <span className={`font-bold ${isOutOfStock ? 'text-slate-400' : 'text-emerald-500'}`}>
            ${flower.wholesalePrice.toFixed(2)}
            <span className="text-[10px] font-normal text-slate-400 ml-0.5">/stem</span>
          </span>
          <button
            className="text-slate-300 hover:text-emerald-500 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <span className="material-icons text-lg">more_vert</span>
          </button>
        </div>
      </div>
    </button>
  );
}

