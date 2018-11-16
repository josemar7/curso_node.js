const path = require('path');

const express = require("express");

const route = require("./routes/route");

const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(route);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'});
});

app.listen(3000);

