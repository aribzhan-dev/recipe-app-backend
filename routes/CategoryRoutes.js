const express = require('express');
const Category = require('../models/Category');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/categories', authMiddleware, async (req, res) => {
    const category = new Category(req.body);
    
    await category.save();
    res.json(category);
});

router.get('/categories', authMiddleware, async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});

router.put('/categories/:id', authMiddleware, async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new : true }
    );

    if (!category) {
        return res.status(404).json({ message : "Category not found" });
    }

    res.json(category);
});

router.delete('/categories/:id', authMiddleware, async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
        return res.status(404).json({ message : "Category not found" });
    }

    res.json({ message : "Category deleted" }); 
});

module.exports = router;