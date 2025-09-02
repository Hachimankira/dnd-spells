import { useMemo, useState } from 'react';
import SpellCard from '../Components/SpellCard';
import useFetchData from '../hooks/useFetchData';
import useFavorites from '../hooks/useFavourites';
import { Star } from 'lucide-react';
import SearchBar from '../Components/SearchBar';
import LoadingSpinner from '../Components/LoadingSpinner';
import ErrorMessage from '../Components/ErrorMessage';
import EmptyState from '../Components/EmptyState';
import { useNavigate } from 'react-router-dom';
import Layout from '../layout/layout';

const SpellList: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const { spells, loading, error } = useFetchData();
    const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

    // Filter spells based on search and active tab
    const filteredSpells = useMemo(() => {
        let filtered = spells;

        if (activeTab === 'favorites') {
            filtered = spells.filter(spell => favorites.includes(spell.index));
        }

        if (searchQuery.trim()) {
            filtered = filtered.filter(spell =>
                spell.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered.sort((a, b) => a.name.localeCompare(b.name));
    }, [spells, favorites, activeTab, searchQuery]);

    const handleToggleFavorite = (spellIndex: string) => {
        if (isFavorite(spellIndex)) {
            removeFavorite(spellIndex);
        } else {
            addFavorite(spellIndex);
        }
    };

    return (
        <Layout spellsCount={spells.length} favoritesCount={favorites.length}>

            {/* Navigation Tabs */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${activeTab === 'all'
                                ? 'border-purple-500 text-purple-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            All Spells ({spells.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('favorites')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 cursor-pointer ${activeTab === 'favorites'
                                ? 'border-purple-500 text-purple-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <Star className="w-4 h-4" />
                            <span>Favorites ({favorites.length})</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder={
                        activeTab === 'favorites'
                            ? "Search your favorite spells..."
                            : "Search spells by name..."
                    }
                />

                {loading && <LoadingSpinner />}

                {error && <ErrorMessage message={error} />}

                {!loading && !error && filteredSpells.length === 0 && (
                    <EmptyState
                        message={
                            activeTab === 'favorites'
                                ? searchQuery
                                    ? "No favorite spells match your search"
                                    : "No favorite spells yet. Start by adding some spells to your favorites!"
                                : searchQuery
                                    ? "No spells match your search"
                                    : "No spells available"
                        }
                    />
                )}

                {!loading && !error && filteredSpells.length > 0 && (
                    <>
                        <div className="mb-4 text-sm text-gray-600">
                            Showing {filteredSpells.length} spell{filteredSpells.length !== 1 ? 's' : ''}
                            {searchQuery && ` matching "${searchQuery}"`}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredSpells.map((spell) => (
                                <SpellCard
                                    key={spell.index}
                                    spell={spell}
                                    isFavorite={isFavorite(spell.index)}
                                    onToggleFavorite={() => handleToggleFavorite(spell.index)}
                                    onClick={() => navigate(`/spell/${spell.index}`)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </main>
        </Layout>
    );
}

export default SpellList;

