import { h, JSX } from 'preact';

/**
 * Props típus a SearchBar komponenshez.
 */
type SearchBarProps = {
  query: string;
  setQuery: (value: string) => void;
  handleSearch: () => void;
};

/**
 * SearchBar komponens, amely lehetővé teszi a felhasználók számára, hogy gyakorlatokat keressenek.
 * @param {SearchBarProps} props - A komponens propjai, beleértve a keresési lekérdezést, a keresési lekérdezés beállításának függvényét és a keresési függvényt.
 * @returns {JSX.Element} A SearchBar komponens JSX eleme.
 */
const SearchBar = ({ query, setQuery, handleSearch }: SearchBarProps): JSX.Element => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by workout name"
        value={query}
        onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">Search</button>
    </div>
  );
};

export default SearchBar;