import { useState } from 'react';

const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteSpells');
    return saved ? JSON.parse(saved) : [];
  });

  const addFavorite = (spellIndex: string) => {
    const newFavorites = [...favorites, spellIndex];
    setFavorites(newFavorites);
    localStorage.setItem('favoriteSpells', JSON.stringify(newFavorites));
  };

  const removeFavorite = (spellIndex: string) => {
    const newFavorites = favorites.filter(fav => fav !== spellIndex);
    setFavorites(newFavorites);
    localStorage.setItem('favoriteSpells', JSON.stringify(newFavorites));
  };

  const isFavorite = (spellIndex: string) => favorites.includes(spellIndex);

  return { favorites, addFavorite, removeFavorite, isFavorite };
};

export default useFavorites;