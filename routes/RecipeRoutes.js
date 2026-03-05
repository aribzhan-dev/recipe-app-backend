const express = require("express");
const Recipe = require("../models/Recipe");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/", authMiddleware, async (req, res) => {
    const recipe = new Recipe({
        ...req.body,
        userID: req.user.userId
    });

    await recipe.save();
    res.json(recipe);
});


router.get("/", authMiddleware, async (req, res) => {
    const recipes = await Recipe.find({ userID: req.user.userId });
    res.json(recipes);
});


router.put("/:id", authMiddleware, async (req, res) => {
    const recipe = await Recipe.findOneAndUpdate(
        { _id: req.params.id, userID: req.user.userId },
        req.body,
        { new: true }
    );

    if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
});


router.delete("/:id", authMiddleware, async (req, res) => {
    const recipe = await Recipe.findOneAndDelete({
        _id: req.params.id,
        userID: req.user.userId
    });

    if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
    }

    res.json({ message: "Recipe deleted" });
});


module.exports = router;