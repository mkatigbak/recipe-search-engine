import { FiSearch } from 'react-icons/fi';

const SearchBar = ({
  ingredients,
  setIngredients,
  selectedDiet,
  setSelectedDiet,
  selectedIntolerances,
  setSelectedIntolerances,
  fetchRecipes,
  loading
}) => {
  const dietOptions = [
    { value: '', label: 'None' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'gluten free', label: 'Gluten Free' },
  ];

  const intoleranceOptions = [
    { value: 'dairy', label: 'Dairy Free' },
    { value: 'peanut', label: 'Peanut Free' },
    { value: 'soy', label: 'Soy Free' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="form-group">
        <label>
          Ingredients (comma-separated):
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g., chicken, tomatoes, garlic"
          />
        </label>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Diet:</label>
          <select
            value={selectedDiet}
            onChange={(e) => setSelectedDiet(e.target.value)}
          >
            {dietOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Intolerances:</label>
          {intoleranceOptions.map(option => (
            <label key={option.value} className="checkbox-label">
              <input
                type="checkbox"
                value={option.value}
                checked={selectedIntolerances.includes(option.value)}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedIntolerances(prev =>
                    prev.includes(value)
                      ? prev.filter(i => i !== value)
                      : [...prev, value]
                  );
                }}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <button type="submit" disabled={loading}>
        <FiSearch /> {loading ? 'Searching...' : 'Search Recipes'}
      </button>
    </form>
  );
};

export default SearchBar;