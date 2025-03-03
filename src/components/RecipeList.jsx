import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, onRecipeSelect }) => {
  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onClick={() => onRecipeSelect(recipe)}
        />
      ))}
    </div>
  );
};

export default RecipeList;