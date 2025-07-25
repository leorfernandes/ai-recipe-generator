import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';

// Create new recipe
export const createRecipe = async (req: Request, res: Response) => {
    try {
        const { title, ingredients, instructions, dietary } = req.body;
        const userId = req.user!.id;

        const recipe = await prisma.recipe.create({
            data: {
                title,
                ingredients,
                instructions,
                dietary,
                userId
            }
        });

        res.status(201).json({
            message: 'Recipe created successfully',
            recipe
        });

    } catch (error) {
        console.error('Create recipe error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all recipes for logged-in user
export const getUserRecipes = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;

        const recipes = await prisma.recipe.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });

        res.status(200).json({
            message: 'Recipes retrieved successfully',
            recipes
        });

    } catch (error) {
        console.error('Get recipes error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get single recipe by ID
export const getRecipeById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user!.id;

        const recipe = await prisma.recipe.findFirst({
            where: {
                id,
                userId
            }
        });

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        res.status(200).json({
            message: 'Recipe retrieved successfully',
            recipe
        });

    } catch (error) {
        console.error('Ger recipe error:', error);
        res.status(500).json({ error: 'Internnal server error' });
    }
};

// Update recipe
export const updateRecipe = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, ingredients, instructions, dietary } = req.body;
        const userId = req.user!.id;

        const recipe = await prisma.recipe.updateMany({
            where: {
                id,
                userId
            },
            data: {
                title,
                ingredients,
                instructions,
                dietary
            }
        });

        if (recipe.count === 0) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        res.status(200).json({
            message: 'Recipe updated successfully'
        });

    } catch (error) {
        console.error('Update recipe error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete recipe
export const deleteRecipe = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user!.id;

        const recipe = await prisma.recipe.deleteMany({
            where: {
                id,
                userId
            }
        });

        if (recipe.count === 0) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        res.status(200).json({
            message: 'Recipe deleted successfully'
        });
    } catch (error) {
        console.error('Delete recipe error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};