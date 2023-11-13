import query from '../config/db.js';
import '../models/recipe.js';

const recipeControllers = {
  getRecipes: async (req, res) => {
    try {
      const recipesQuery = `SELECT *FROM recipes;`;
      const result = await query(recipesQuery);
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
      const recipeQuery = `SELECT * FROM recipes WHERE id=?;`;
      const result = await query(recipeQuery, [id]);
      console.log(result);
      if (result.length > 0) {
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
        const recipeQuery = `INSERT INTO recipes(name, description) VALUES (?, ?);`;
        const result = await query(recipeQuery, [name, description]);
        return res.status(201).json({
          success: true,
          recipe: { id: result.insertId, name, description }
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
      const recipeQuery = `
      UPDATE recipes SET 
      name=?, 
      description=? 
      WHERE id=?;
      `;
      const result = await query(recipeQuery, [name, description, id]);
      if (result.affectedRows > 0) {
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
      const recipeQuery = `DELETE FROM recipes WHERE id=?;`;
      const result = await query(recipeQuery, { id });
      console.log(result.affectedRows);
      if (result.affectedRows > 0) {
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
