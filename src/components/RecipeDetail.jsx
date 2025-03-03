import { FiX } from 'react-icons/fi';
import DOMPurify from 'dompurify';

const RecipeDetail = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className="recipe-detail-overlay">
      <div className="recipe-detail">
        <button className="close-btn" onClick={onClose}>
          <FiX />
        </button>
        
        {recipe.image && (
          <img src={recipe.image} alt={recipe.title} />
        )}
        
        <h2>{recipe.title}</h2>
        
        <div className="cooking-time">
          🕒 {recipe.readyInMinutes || 'N/A'} minutes
        </div>
        
        <div className="ingredients">
          <h3>Ingredients</h3>
          <ul>
            {(recipe.extendedIngredients || []).map(ingredient => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        </div>

        <div className="instructions">
          <h3>Instructions</h3>
          {(recipe.analyzedInstructions?.[0]?.steps || []).map(step => (
            <div key={step.number} className="step">
              <div className="step-number">Step {step.number}</div>
              <div
                className="step-text"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(step.step),
                }}
              />
            </div>
          ))}
          {!recipe.analyzedInstructions && (
            <p>Instructions not available for this recipe.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;