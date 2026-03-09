const express = require("express");
const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// Create recipe
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, desc, ingredients, instructions, category } = req.body;

        if (!title || !desc || !ingredients || !instructions || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({ message: "Invalid category ID" });
        }

        const recipe = new Recipe({
            title,
            desc,
            ingredients,
            instructions,
            category,
            userID: req.user.userId
        });

        await recipe.save();
        res.status(201).json(recipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get all recipes
router.get("/", authMiddleware, async (req, res) => {
    try {
        const recipes = await Recipe.find({ userID: req.user.userId })
            .populate("category", "title");
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Update recipe
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid recipe ID" });
        }

        // Faqat ruxsat etilgan maydonlarni olish (Mass Assignment oldini olish)
        const { title, desc, ingredients, instructions, category } = req.body;

        if (category && !mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({ message: "Invalid category ID" });
        }

        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (desc !== undefined) updateData.desc = desc;
        if (ingredients !== undefined) updateData.ingredients = ingredients;
        if (instructions !== undefined) updateData.instructions = instructions;
        if (category !== undefined) updateData.category = category;

        const recipe = await Recipe.findOneAndUpdate(
            { _id: req.params.id, userID: req.user.userId },
            updateData,
            { new: true }
        );

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.json(recipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Delete recipe
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid recipe ID" });
        }

        const recipe = await Recipe.findOneAndDelete({
            _id: req.params.id,
            userID: req.user.userId
        });

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.json({ message: "Recipe deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;