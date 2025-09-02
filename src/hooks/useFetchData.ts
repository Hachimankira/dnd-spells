import { useState, useEffect, useCallback } from 'react';
import type { Spell, SpellDetail } from '../types/spells';

const useFetchData = () => {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpells = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://www.dnd5eapi.co/api/spells');
        if (!response.ok) throw new Error('Failed to fetch spells');
        const data = await response.json();
        setSpells(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSpells();
  }, []);

  const fetchSpellDetail = useCallback(async (spellIndex: string): Promise<SpellDetail | null> => {
    try {
      const response = await fetch(`https://www.dnd5eapi.co/api/spells/${spellIndex}`);
      if (!response.ok) throw new Error('Failed to fetch spell details');
      return await response.json();
    } catch (err) {
      console.error('Error fetching spell detail:', err);
      return null;
    }
  }, []);

  return { spells, loading, error, fetchSpellDetail };
};

export default useFetchData;