const express = require("express");
const mongoose = require("mongoose");
const Category = require("../models/Category");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();



router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({ message: "Title is required" });
        }

        const category = new Category({
            title: title.trim(),
            userID: req.user.userId
        });

        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get("/", authMiddleware, async (req, res) => {
    try {
        const categories = await Category.find({ userID: req.user.userId });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



router.put("/:id", authMiddleware, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid category ID" });
        }

        const { title } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({ message: "Title is required" });
        }

        const category = await Category.findOneAndUpdate(
            { _id: req.params.id, userID: req.user.userId },
            { title: title.trim() },
            { new: true }
        );

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid category ID" });
        }

        const category = await Category.findOneAndDelete({
            _id: req.params.id,
            userID: req.user.userId
        });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json({ message: "Category deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;