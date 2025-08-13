/**
 * FlavorCraft AI - Main Application Component
 * 
 * A React application that generates custom recipes using OpenAI's GPT-3.5 API.
 * Users input ingredients and dietary restrictions to receive AI-generated recipes.
 * 
 * Features:
 * - Recipe generation via OpenAI API
 * - Responsive design with Tailwind CSS
 * - Contact form via Formspree
 * - Professional portfolio presentation
 */

import { AuthProvider } from './contexts/AuthContext';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RecipeForm from './components/RecipeForm';
import RecipeDisplay from './components/RecipeDisplay';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  // State management for recipe and loading status
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);
  
  /**
   * Handles recipe generation via OpenAI API
   * @param {string} ingredients - User-provided ingredient list
   * @param {string} restrictions - User-provided dietary restrictions
   */
  const handleGenerate = async (ingredients, restrictions) => {
    setLoading(true);
    setRecipe('');

    // Construct enhanced prompt for OpenAI API with clear formatting instructions
    const prompt = `Create a recipe using these ingredients: ${ingredients}

Dietary restrictions: ${restrictions || 'none'}

Please format your response EXACTLY like this example:

Delicious Recipe Name

Ingredients:
- 1 cup ingredient 1
- 2 tablespoons ingredient 2
- 1 teaspoon ingredient 3

Instructions:
1. First step description here
2. Second step description here
3. Third step description here
4. Continue with remaining steps

Keep the recipe simple, practical, and easy to follow. Use clear measurements and cooking times.`;

    try {
      // Call OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt}],
          max_tokens: 500, // Limited for cost optimization
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || 'Something went wrong!';
      setRecipe(content);
      
    } catch {
      setRecipe('Error generating recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-stone-50 w-full overflow-x-hidden">
        {/* Navigation */}
        <Navbar />
        
        {/* Hero section with main messaging */}
        <Hero />
        
        {/* Interactive recipe generation form */}
        <RecipeForm onGenerate={handleGenerate} loading={loading} />
        
        {/* Recipe display with loading states */}
        <RecipeDisplay recipe={recipe} loading={loading} />
        
        {/* Project information */}
        <About />
        
        {/* Contact form */}
        <Contact />
        
        {/* Footer with links and disclaimer */}
        <Footer onGenerate={handleGenerate}/>
      </div>
    </AuthProvider>
  );
}

export default App;
