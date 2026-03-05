const express = require("express");
const Task = require("../models/Recipe");
const authMiddleware = require("../middleware/authMiddleware");
const Recipe = require("../models/Recipe");

const router = express.Router();

router.post("/recipes", authMiddleware, async (req, res) => {
    const recipe = new Recipe({
        ...req.body,
        userID : req.user._id
    });

    await recipe.save();
    res.json(recipe);

});

router.get("/recipes", authMiddleware, async (req, res) => {
    const recipes = await Recipe.find({ userID : req.user._id });
    res.json(recipes);
});

router.put("/recipes/:id", authMiddleware, async (req, res) => {
    const recipe = await Recipe.findOneAndUpdate(
        { _id : req.params.id, userID : req.user._id },
        req.body,
        { new : true }
    );

    if (!recipe) {
        return res.status(404).json({ message : "Recipe not found" });
    }

    res.json(recipe);
});

router.delete("/recipes/:id", authMiddleware, async (req, res) => {
    const recipe = await Recipe.findOneAndDelete(
        { _id : req.params.id, userID : req.user._id }
    );
    
    if (!recipe) {
        return res.status(404).json({ message : "Recipe not found" });
    }
    
    res.json({ message : "Recipe deleted" });

});

module.exports = router;