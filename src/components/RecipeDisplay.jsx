/**
 * RecipeDisplay Component
 * 
 * Displays the AI-generated recipe in a structured format with loading states.
 * Parses raw text from OpenAI API into organized sections (title, ingredients, instructions).
 * 
 * Props:
 * - loading: Boolean indicating if API call is in progress
 * - recipe: String containing the raw recipe text from OpenAI
 */

import AnimatedSection from './AnimatedSection';

function RecipeDisplay({ loading, recipe }) {

    /**
     * Parses raw recipe text into structured sections
     * @param {string} recipeText - Raw text from OpenAI API
     * @returns {object} - Object containing title, ingredients array, and instructions array
     */
    const formatRecipe = (recipeText) => {
        const lines = recipeText.split('\n').filter(line => line.trim() !== '');

        let title = '';
        let ingredients = [];
        let instructions = [];
        let currentSection = 'title';

        // Parse each line and categorize content
        lines.forEach(line => {
            if (line.toLowerCase().includes('ingredient')) {
                currentSection = 'ingredients';
            } else if (line.toLowerCase().includes('instruction')) {
                currentSection = 'instructions';
            } else if (currentSection === 'title' && !title) {
                title = line.trim();
            } else if (currentSection === 'ingredients') {
                ingredients.push(line.trim());
            } else if (currentSection === 'instructions') {
                instructions.push(line.trim());
            }
        });

        return { title, ingredients, instructions };
    }

    // Parse the recipe text
    const { title, ingredients, instructions } = formatRecipe(recipe);

    // Don't render anything if no recipe and not loading
    if (!loading && recipe === ''){
        return null;
    } 
    
    // Show loading state while API call is in progress
    else if (loading && recipe === '' ){
        return (
            <section className="flex justify-center px-4">
                <div className="w-full flex justify-center bg-yellow-50 shadow-md">
                    <div className="flex items-center justify-center flex-col w-full max-w-lg py-8 md:py-12">
                        {/* Animated loading spinner */}
                        <div className="animate-spin p-4 md:p-6 m-4 border-4 border-transparent border-dotted rounded-full border-t-orange-600 border-b-lime-600" />
                        
                        {/* Loading messages */}
                        <p className="text-lg md:text-2xl text-stone-600 p-2 md:p-4 text-body text-center">
                            Please wait...
                        </p>
                        <p className="text-base md:text-xl text-stone-600 p-2 md:p-4 text-body text-center">
                            Our virtual chefs are working hard to generate your recipe...
                        </p>
                    </div>
                </div>
            </section>
        )
    }
    
    // Display the formatted recipe
    return(
        <AnimatedSection>
            <section className="flex justify-center px-4">
                <div className="w-full flex justify-center bg-yellow-50 shadow-md">
                    <div className="flex items-left text-left flex-col w-full max-w-2xl rounded-xl border border-orange-600 m-4 md:m-8 hover:border-orange-700 transition-colors transition-200 bg-white">
                        
                        {/* Recipe title section */}
                        <div className="mt-4 md:mt-6 p-4 md:p-6">
                            <h1 className="text-2xl md:text-3xl font-heading text-center text-orange-600 mb-4 md:mb-6 font-bold">
                                {title}
                            </h1>
                        </div>

                        {/* Ingredients section */}
                        <div className="p-4 md:p-6">
                            <h2 className="text-lg md:text-xl font-heading text-stone-700 mb-3 font-semibold">Ingredients</h2>
                            <ul className="text-body text-stone-600 space-y-1 text-sm md:text-base">
                                {ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Instructions section */}
                        <div className="mb-4 md:mb-6 p-4 md:p-6">
                            <h2 className="text-lg md:text-xl font-heading text-stone-700 mb-3 font-semibold">Instructions</h2>
                            <ol className="text-body text-stone-600 space-y-2 text-sm md:text-base">
                                {instructions.map((instruction, index) => (
                                    <li key={index}>{instruction}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
        </AnimatedSection>
    );

}

export default RecipeDisplay;