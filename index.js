const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');

const homeRoutes = require('./routes/home');
const cardRoutes = require('./routes/card');
const productsRoutes = require('./routes/products');
const addRoutes = require('./routes/add');

const app = express();
const port = 3000;
const password = '9pNeDUpB7f3YsUhX';

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use('/', homeRoutes);
app.use('/products', productsRoutes);
app.use('/add', addRoutes);
app.use('/card', cardRoutes);

(async function start() {
    try {
        const url = 'mongodb+srv://user:9pNeDUpB7f3YsUhX@cluster0-hsbci.mongodb.net/test?retryWrites=true&w=majority';
        await mongoose.connect(url, {useNewUrlParser: true});
        app.listen(port, () => console.log(`Example app listening on port: ${port}!`))
    } catch (e) {
        console.log(e);
    }
})();