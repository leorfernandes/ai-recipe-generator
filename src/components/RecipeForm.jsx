/**
 * RecipeForm Component
 * 
 * Interactive form for users to input ingredients and dietary restrictions.
 * Handles form submission and passes data to parent component for API call.
 * 
 * Props:
 * - onGenerate: Function to call when form is submitted
 * - loading: Boolean indicating if API call is in progress
 */

import { useState } from 'react';
import AnimatedSection from './AnimatedSection';

function RecipeForm({ onGenerate, loading }) {
    // Local state for form inputs
    const [ingredients, setIngredients] = useState('');
    const [restrictions, setRestrictions] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate that ingredients field is not empty
        if (!ingredients.trim()) return;
        
        // Call parent's generate function with form data
        onGenerate(ingredients, restrictions);
    };

    return(
        <AnimatedSection>
            <section id="live-demo" className="max-w-2xl mx-auto py-8 md:py-16 px-4">
                {/* Section heading */}
                <h2 className="text-xl md:text-2xl text-stone-700 text-center mb-6 md:mb-8 font-bold font-heading">
                    Live Demo
                </h2>
                
                {/* Recipe generation form */}
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    
                    {/* Ingredients input field */}
                    <div>
                        <label htmlFor="ingredients" className="block text-sm font-medium text-stone-700 mb-2 font-heading">
                            Ingredient List
                        </label>
                        <textarea
                            id="ingredients"
                            rows={3}
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            placeholder="e.g. rice, garlic, mozzarella, tomatoes..."
                            className="w-full p-3 md:p-4 border text-white border-orange-900 rounded-lg focus:ring-2 focus:ring-lime-600 focus:border-transparent resize-none shadow-md font-body text-sm md:text-base"
                        />
                    </div>

                    {/* Dietary restrictions input field (optional) */}
                    <div>
                        <label htmlFor="restrictions" className="block text-sm font-medium text-stone-700 mb-2 font-heading">
                            Restriction List
                        </label>
                        <textarea
                            id="restrictions"
                            rows={3}
                            value={restrictions}
                            onChange={(e) => setRestrictions(e.target.value)}
                            placeholder="e.g. vegetarian, gluten-free, no peanut..."
                            className="w-full p-3 md:p-4 border text-white order-orange-900 rounded-lg focus:ring-2 focus:ring-lime-600 focus:border-transparent resize-none font-body shadow-md text-sm md:text-base"
                        />
                    </div>

                    {/* Submit button with loading state */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-stone-700 disabled:cursor-not-allowed text-white font-semibold py-3 md:py-4 px-6 rounded-lg transition-colors duration-200 shadow-md text-heading text-sm md:text-base"
                    >
                        {loading ? 'Generating Recipe...' : 'Generate Recipe'}
                    </button>
                </form>
            </section>
        </AnimatedSection>
    );
}

export default RecipeForm;