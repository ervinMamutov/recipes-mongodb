import Recipe from '../models/recipe.js';

const recipeControllers = {
  getRecipes: async (req, res) => {
    try {
      const result = await Recipe.find();
      if (result.length > 0) {
        res.status(200).json({
          success: true,
          recipes: result
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'Recipes not found'
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        err: err.message || 'Error while getting a recipes'
      });
    }
  },
  getRecipe: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Recipe.findOne({ _id: id });
      console.log(result);
      if (result) {
        return res.status(200).json({
          success: true,
          recipe: result
        });
      } else {
        res.status(400).json({
          success: false,
          message: `No recipe was found for the identifier: ${id}`
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        err: err.message || 'Error while getting a recipe'
      });
    }
  },
  addRecipe: async (req, res) => {
    try {
      const { name, description } = req.body;
      if (!name || !description) {
        res.status(400).json({
          success: false,
          message: 'Please end the required data'
        });
      } else {
        const result = await Recipe.create({
          name: name,
          description: description
        });
        return res.status(201).json({
          success: true,
          recipe: result
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        err: err.message || 'Error when add a new recipe'
      });
    }
  },
  updateRecipe: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      if (!name || !description) {
        return res.status(400).json({
          success: false,
          message: 'Please, added the required data'
        });
      }
      const result = await Recipe.updateOne({ _id: id }, { name, description });
      if (result.modifiedCount > 0) {
        return res.status(201).json({
          success: true,
          message: 'Recipe updated successfully'
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'Recipe no found for update'
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        err: err.message || `Recipe by id: ${id} not found`
      });
    }
  },
  deleteRecipe: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Recipe.deleteOne({ _id: id });
      console.log(result.affectedRows);
      if (result.deletedCount > 0) {
        return res.status(200).json({
          success: true,
          message: 'The recipe has been successfully deleted'
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'Recipe not found for deletion'
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        err: err.message || 'Recipe not found for deletion'
      });
    }
  }
};

export default recipeControllers;
