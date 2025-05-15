import { useEffect, useState } from 'react';

interface TagItem {
  id: string;
  name: string;
  type: 'LOCAL' | 'CATEGORIA' | 'OCASIAO';
}

const useFetchTags = (url: string) => {
  const [tags, setTags] = useState<TagItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(url, { credentials: 'include' });
        if (!response.ok) {
          throw new Error(`Erro ao buscar tags: ${response.statusText}`);
        }
        const data = await response.json();
        setTags(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [url]);

  return { tags, loading, error };
};

export default useFetchTags;
