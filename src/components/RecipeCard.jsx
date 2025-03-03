import DOMPurify from 'dompurify';

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <div className="recipe-info">
        <span>🕒 {recipe.readyInMinutes} mins</span>
        <div
          className="summary"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(recipe.summary),
          }}
        />
      </div>
    </div>
  );
};

export default RecipeCard;