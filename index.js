const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
// const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const csrf = require('csurf');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);

const homeRoutes = require('./routes/home');
const cardRoutes = require('./routes/card');
const productsRoutes = require('./routes/products');
const addRoutes = require('./routes/add');
const ordersRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

const errorHandler = require('./middleware/error');
const vatMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user');
const fileMiddleware = require('./middleware/file');
const keys = require('./keys');

const app = express();
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
    helpers: require('./utils/hbs-helpers')
});
const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGODB_URI
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

// app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/images", express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}));
app.use(fileMiddleware.single('avatar'));
app.use(csrf());
app.use(flash());
app.use(helmet());
app.use(vatMiddleware);
app.use(userMiddleware);

app.use('/', homeRoutes);
app.use('/products', productsRoutes);
app.use('/add', addRoutes);
app.use('/card', cardRoutes);
app.use('/orders', ordersRoutes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.use(errorHandler);

(async function start() {
    try {
        await mongoose.connect(keys.MONGODB_URI, {
            useNewUrlParser: true,
            useFindAndModify: false
        });
        app.listen(3000, () => console.log(`Example app listening on port: 3000!`))
    } catch (e) {
        console.log(e);
    }
})();