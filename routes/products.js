const express = require('express');
const router = express.Router();
const Product = require('./../models/product');

router.get("/", async (req, res) => {
    const products = await Product.getAll();
    res.render('products', {
        title: "Товары",
        isProducts: true,
        products
    });    
});

router.get("/:id/edit", async (req, res) => {
    if(!req.query.allow) {
        return res.redirect("/");
    }

    console.log("lol");
    const product = await Product.getByID(req.params.id);

    res.render('product-edit', {
       title: `Редактировать ${product.title}`,
       product 
    });
});

router.post('/edit', async (req, res) => {
    await Product.update(req.body);
    res.redirect("/products");
});

router.get("/:id", async (req, res) => {
    const product = await Product.getByID(req.params.id);
    res.render('product', {
        layout: 'empty',
        title: `Курс ${product.title}`,
        product
    });    
});

module.exports = router;