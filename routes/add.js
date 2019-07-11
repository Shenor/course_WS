const express = require('express');
const Product = require('../models/product');
const router = express.Router();

router.get("/", (req, res) => {
    res.render('add', {
        title: "Добавить товар",
        isAdd: true
    });
});

router.post('/', async (req, res) => {
    const {title, price, img} = req.body;
    console.log(req.body);
    const product = new Product(req.body);

    try {
        await product.save();
        res.redirect('/products');
    } catch (error) {
        console.log(error);
    }   
});

module.exports = router;