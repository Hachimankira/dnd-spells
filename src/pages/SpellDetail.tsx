import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { SpellDetail } from '../types/spells';
import { ArrowLeft, Heart, Loader } from 'lucide-react';
import useFavorites from '../hooks/useFavourites';
import useFetchData from '../hooks/useFetchData';
import Layout from '../layout/layout';

const SpellDetailPage: React.FC = () => {
    const { index } = useParams<{ index: string }>();
    const navigate = useNavigate();
    const { fetchSpellDetail } = useFetchData();
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const [detail, setDetail] = useState<SpellDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!index) return;
        const loadDetail = async () => {
            setLoading(true);
            const spellDetail = await fetchSpellDetail(index);
            setDetail(spellDetail);
            setLoading(false);
        };
        loadDetail();
    }, [index, fetchSpellDetail]);

    const handleToggleFavorite = () => {
        if (!index) return;
        if (isFavorite(index)) {
            removeFavorite(index);
        } else {
            addFavorite(index);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader className="w-8 h-8 animate-spin text-purple-600" />
                <span className="ml-2 text-gray-600">Loading spell details...</span>
            </div>
        );
    }

    if (!detail) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center text-red-600">Failed to load spell details</div>
            </div>
        );
    }

    return (
        <Layout>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 mt-4 px-4">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4 sm:mb-0 cursor-pointer"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to List
                </button>
                <button
                    onClick={handleToggleFavorite}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${isFavorite(index!)
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                        }`}
                >
                    <Heart className={`w-5 h-5 ${isFavorite(index!) ? 'fill-current' : ''}`} />
                    <span>{isFavorite(index!) ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                </button>
            </div>
            <div className="flex flex-col items-center justify-center py-8 px-4">

                <div className="bg-white rounded-2xl shadow-lg border-4 border-purple-700 w-full max-w-2xl p-6">
                    {/* Title */}
                    <h1 className="text-3xl font-extrabold text-center text-purple-800 mb-6">
                        {detail.name}
                    </h1>
                    <div className="space-x-2 mb-4">
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                            {detail.level === 0 ? 'Cantrip' : `Level ${detail.level}`}
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {detail.school.name}
                        </span>
                        {detail.ritual && (
                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                                Ritual
                            </span>
                        )}
                        {detail.concentration && (
                            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                                Concentration
                            </span>
                        )}
                    </div>

                    {/* Casting Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6 text-sm">
                        <div className="bg-purple-50 rounded-lg p-3 text-center">
                            <p className="font-semibold text-purple-800">Casting Time</p>
                            <p className="text-gray-700">{detail.casting_time}</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3 text-center">
                            <p className="font-semibold text-purple-800">Range</p>
                            <p className="text-gray-700">{detail.range}</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3 text-center">
                            <p className="font-semibold text-purple-800">Components</p>
                            <p className="text-gray-700">{detail.components.join(', ')}</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3 text-center">
                            <p className="font-semibold text-purple-800">Duration</p>
                            <p className="text-gray-700">{detail.duration}</p>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-2 mb-3">Description</h2>
                        <div className="space-y-3 text-sm text-gray-700">
                            {detail.desc.map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>
                    </div>

                    {/* Higher Levels */}
                    {detail.higher_level && detail.higher_level.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-2 mb-3">At Higher Levels</h2>
                            <div className="space-y-3 text-sm text-gray-700">
                                {detail.higher_level.map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Classes */}
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-2 mb-3">Classes</h2>
                        <div className="space-x-2">
                            {detail.classes.map((cls) => (
                                <span
                                    key={cls.index}
                                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium"
                                >
                                    {cls.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    );
};

export default SpellDetailPage;