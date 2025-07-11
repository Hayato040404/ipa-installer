import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    // 検索ロジックは必要に応じて追加
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search apps..."
        className="w-full p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  );
}
