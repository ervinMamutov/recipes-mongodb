import express from 'express';

const router = express.Router();

import recipeControllers from '../controllers/recipe.js';
import verifyToken from '../middleware/verifyToken.js';

// routes
router.get('/', recipeControllers.getRecipes);
router.get('/:id', recipeControllers.getRecipe);
router.post('/add-recipe', verifyToken, recipeControllers.addRecipe);
router.put('/update/:id', verifyToken, recipeControllers.updateRecipe);
router.delete('/delete/:id', verifyToken, recipeControllers.deleteRecipe);

export default router;
