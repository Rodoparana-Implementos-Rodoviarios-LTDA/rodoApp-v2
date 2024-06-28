import React, { ChangeEvent } from "react";

interface SearchProps {
  setFilter: (filter: string) => void;
}

const Search: React.FC<SearchProps> = ({ setFilter }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value.toUpperCase());
  };

  return (
    <div className="flex items-center">
      <form className="max-w-md mx-auto">
        <label className="mb-5 text-sm font-medium text-zinc-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-zinc-500 dark:text-zinc-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="myInput"
            onChange={handleInputChange}
            placeholder="Pesquisar"
            className="block w-full p-2 pl-10 text-sm border border-zinc-300 rounded-lg bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white focus:ring-zinc-500 focus:border-zinc-500"
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
