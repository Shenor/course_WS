const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();
const port = 3000;

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', {
        title: "Главная страница",
        isHome: true
    });
});

app.get('/products', (req, res) => {
    res.render('products', {
        title: "Товары",
        isProducts: true
    });
});

app.get('/add', (req, res) => {
    res.render('addProducts', {
        title: "Добавить товар",
        isAdd: true
    });
});

app.listen(port, () => console.log(`Example app listening on port: ${port}!`))