const path = require('path');

const express = require("express");

const rootRoutes = require("./routes/root");
const usersRoutes = require('./routes/users');

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(usersRoutes);
app.use(rootRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// const server = http.createServer(app);

// server.listen(3000);
app.listen(3000);
