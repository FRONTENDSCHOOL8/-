import { useCallback } from 'react';
import { string, func, oneOf } from 'prop-types';
import ResetBtn from '../../atoms/ResetBtn/ResetBtn';
import SearchIcon from '../../atoms/SearchIcon/SearchIcon';
import SearchInput from '../../atoms/SearchInput/SearchInput';

function SearchBar({ query, onQueryChange, onResetClick, pgName }) {
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <form
      className="bg-grayscale-white w-full flex justify-between items-center gap-2 rounded border border-primary-500 px-3 py-2 "
      onSubmit={handleSubmit}
    >
      <SearchIcon />
      <SearchInput query={query} onChange={onQueryChange} pgName={pgName} />
      {query === '' ? null : <ResetBtn onClick={onResetClick} />}
    </form>
  );
}

SearchBar.propTypes = {
  query: string.isRequired,
  onQueryChange: func.isRequired,
  onResetClick: func.isRequired,
  pgName: oneOf(['bookshelf', 'book-search']),
};

export default SearchBar;
