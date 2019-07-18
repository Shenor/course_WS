const express = require('express');
const Product = require('../models/product');
const router = express.Router();
const auth = require('../middleware/auth');

router.get("/", auth, (req, res) => {
    res.render('add', {
        title: "Добавить товар",
        isAdd: true
    });
});

router.post('/', auth, async (req, res) => {
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
        userId: req.user
    });

    try {
        await product.save();
        res.redirect('/products');
    } catch (error) {
        console.log(error);
    }   
});

module.exports = router;