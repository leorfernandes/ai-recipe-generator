import express from 'express';
import {
    createRecipe,
    getUserRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe
} from '../controllers/recipeController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All recipe routes are protected (require authentication)
router.use(authenticateToken);

// POST /api/recipes - Create new recipe
router.post('/', createRecipe);

// GET /api/recipes - Get user's recipes
router.get('/', getUserRecipes);

// GET /api/recipes/:id - Get single recipe
router.get('/:id', getRecipeById);

// PUT /api/recipes/:id - Update recipe
router.put('/:id', updateRecipe);

// DELETE /api/recipe/:id - Delete recipe
router.delete('/:id', deleteRecipe);

export default router;