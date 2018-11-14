const express = require('express');

const app = express();

app.use('/users', (req, res, next) => {
    console.log('Middleware 1');
    res.send(`
    <h1>Users</h1>
    `);
});

app.use('/', (req, res, next) => {
    console.log('Middleware 2');
    res.send(`
    <h1>Root</h1>
    `);
});


app.listen(3000);