

const SearchBar = ({ formSubmit, value, handleSearchKey, clearSearch }) => (
  <div className="p-2 md:p-0">
    <div className='bg-gray-200 rounded w-full md:w-3/5 mx-auto p-2 my-5'>
      <form className="flex items-center" onSubmit={formSubmit}>
        <input
          className="w-full border-none outline-none bg-transparent"
          type='text'
          placeholder='Search Softwares By Title & Category'
          value={value}
          onChange={handleSearchKey}
        />
        {value && <span className="pr-2 cursor-pointer" onClick={clearSearch}>X</span>}
        <button className="outline-none border-none bg-gradient-to-r from-primary via-secondary to-accent hover:from-accent hover:to-primary duration-300 rounded ml-2 px-2 py-1 text-white">Search</button>
      </form>
    </div>
  </div>
);

export default SearchBar;
