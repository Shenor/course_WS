const express = require('express');
const router = express.Router();
const Product = require('./../models/product');
const auth = require('../middleware/auth');
const {productValidator} = require('../utils/validators');
const {validationResult} = require('express-validator');

function isOwner(product, req){
    return product.userId.toString() === req.user._id.toString();
}

router.get("/", async (req, res) => {
    try {
        const products = await Product.find()
        .populate('userId', 'email name')
        .select('price title img');
  
    res.render('products', {
        title: "Товары",
        isProducts: true,
        userId: req.user ? req.user._id.toString() : null,
        products
    });  
    } catch (error) {
        console.log(error);
    }  
});

router.get("/:id/edit", auth, async (req, res) => {
    if(!req.query.allow) {
        return res.redirect("/");
    }

    try {
        const product = await Product.findById(req.params.id);
        if(!isOwner(product, req)){
           return res.redirect('/products');
        }

        res.render('product-edit', {
           title: `Редактировать ${product.title}`,
           product 
        }); 
    } catch (error) {
        console.log(error);
    }
});

router.post('/edit', auth, productValidator, async (req, res) => {
    const errors = validationResult(req);
    const {id} = req.body;
    
    if(!errors.isEmpty()){
       return res.status(422).redirect(`/products/${id}/edit?allow=true`)
    }

    try {
        delete req.body.id;
        const product = await Product.findById(id);
        if(!isOwner(product, req)) {
            return res.redirect('/products')
        }
        Object.assign(product, req.body);
        await product.save();
        res.redirect("/products");
    } catch (error) {
        console.log(error)
    }
});

router.post('/remove', auth, async (req, res) => {
    try {
        await Product.deleteOne({
            _id: req.body.id,
            userid: req.user._id
        });
        res.redirect('/products');
    } catch (error) {
        console.log(error);
    } 
});

router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render('product', {
            layout: 'empty',
            title: `Курс ${product.title}`,
            product
        });   
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;