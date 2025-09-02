import { Heart, Zap } from "lucide-react";
import type { Spell } from "../types/spells";

const SpellCard: React.FC<{
  spell: Spell;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
}> = ({ spell, isFavorite, onToggleFavorite, onClick }) => (
  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-200">
    <div onClick={onClick} className="p-4">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors">
          {spell.name}
        </h3>
        <div className="flex items-center space-x-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
              Level {spell.level}
            </span>
        </div>
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <Zap className="w-4 h-4 mr-1" />
        <span>Click to view details</span>
      </div>
    </div>
    <div className="px-4 pb-4">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-all cursor-pointer ${
          isFavorite
            ? 'bg-red-50 text-red-600 hover:bg-red-100'
            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        <span>{isFavorite ? 'Favorited' : 'Add to Favorites'}</span>
      </button>
    </div>
  </div>
);

export default SpellCard;