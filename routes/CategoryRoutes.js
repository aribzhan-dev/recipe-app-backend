const express = require("express");
const Category = require("../models/Category");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/", authMiddleware, async (req, res) => {
    const category = new Category({
        title: req.body.title,
        userID: req.user.userId
    });

    await category.save();
    res.json(category);
});


router.get("/", authMiddleware, async (req, res) => {
    const categories = await Category.find({ userID: req.user.userId });
    res.json(categories);
});


router.put("/:id", authMiddleware, async (req, res) => {
    const category = await Category.findOneAndUpdate(
        { _id: req.params.id, userID: req.user.userId },
        { title: req.body.title },
        { new: true }
    );

    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
});


router.delete("/:id", authMiddleware, async (req, res) => {
    const category = await Category.findOneAndDelete({
        _id: req.params.id,
        userID: req.user.userId
    });

    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted" });
});


module.exports = router;