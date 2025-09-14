'use client';
import { Search } from 'lucide-react';
import { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  return (
    <form className="relative flex flex-1 justify-center items-center">
      <input
        className="bg-foreground/10 h-9 px-4 py-2 flex w-full items-center justify-center rounded-lg"
        type="text"
        placeholder="Rechercher"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button
        className="absolute right-1 h-7 flex items-center justify-center cursor-pointer rounded-sm bg-primary hover:bg-primary/90 text-background aspect-square"
        type="submit"
      >
        <Search size={18} />
      </button>
    </form>
  );
};

export default SearchBar;
