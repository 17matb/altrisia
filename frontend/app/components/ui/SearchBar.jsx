'use client';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://127.0.0.1:8000/search/?query=${encodeURIComponent(query)}`
        );

        if (!res.ok) {
          setResults([]);
          return;
        }

        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error('Erreur recherche:', err);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleClickResult = (postId) => {
    router.push(`/annonce/${postId}`); 
    setQuery('');
    setResults([]);
  };

  return (
    <div className="relative flex flex-col flex-1">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative flex items-center"
      >
        <input
          type="text"
          placeholder="Rechercher"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-foreground/10 h-9 px-4 py-2 w-full rounded-lg"
        />
        <button
          type="submit"
          className="absolute right-1 h-7 flex items-center justify-center rounded-sm bg-primary hover:bg-primary/90 text-background aspect-square"
        >
          <Search size={18} />
        </button>
      </form>

      {loading && (
        <p className="text-sm text-gray-500 mt-2">Recherche...</p>
      )}

      {!loading && results.length > 0 && (
        <ul className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg p-2 z-50">
          {results.map((item) => (
            <li
              key={item.post_id}
              onClick={() => handleClickResult(item.post_id)}
              className="px-2 py-2 hover:bg-gray-100 cursor-pointer rounded"
            >
              <p className="font-medium">{item.titre}</p>
              <p className="text-sm text-gray-600 line-clamp-1">
                {item.description}
              </p>
              <span className="text-xs text-gray-400">{item.ville}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
