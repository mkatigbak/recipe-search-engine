import { useState } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import './App.css';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');
  const [selectedIntolerances, setSelectedIntolerances] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecipes = async () => {
    setLoading(true);
    setError('');
    try {
      const ingredientsList = ingredients.split(',').map(i => i.trim()).filter(i => i).join(',');
      const queryParams = new URLSearchParams();

      if (ingredientsList) queryParams.append('includeIngredients', ingredientsList);
      if (selectedDiet) queryParams.append('diet', selectedDiet);
      if (selectedIntolerances.length) queryParams.append('intolerances', selectedIntolerances.join(','));
      
      queryParams.append('addRecipeInformation', 'true');
      queryParams.append('number', '10');
      queryParams.append('apiKey', import.meta.env.VITE_SPOONACULAR_API_KEY);

      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch recipes');
      
      const data = await response.json();
      setRecipes(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Recipe Search Engine</h1>
      <hr></hr>
      <SearchBar
        ingredients={ingredients}
        setIngredients={setIngredients}
        selectedDiet={selectedDiet}
        setSelectedDiet={setSelectedDiet}
        selectedIntolerances={selectedIntolerances}
        setSelectedIntolerances={setSelectedIntolerances}
        fetchRecipes={fetchRecipes}
        loading={loading}
      />
      
      {error && <p className="error">{error}</p>}
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <RecipeList recipes={recipes} onRecipeSelect={setSelectedRecipe} />
      )}

      {selectedRecipe && (
        <RecipeDetail recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </div>
  );
}

export default App;