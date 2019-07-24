const express = require('express');
const Product = require('../models/product');
const {validationResult} = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const {productValidator} =  require('../utils/validators');

router.get("/", auth, (req, res) => {
    res.render('add', {
        title: "Добавить товар",
        isAdd: true
    });
});

router.post('/', auth, productValidator, async (req, res) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
       return res.status(422).render('add', {
           title: 'Добавить курс',
            isAdd: true,
            error: errors.array()[0].msg,
            data: {
                title: req.body.title,
                price: req.body.price,
                img: req.body.img
            }
       }) 
    }

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