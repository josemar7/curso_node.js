// mysql
// // const mysql = require('mysql2');

// // const pool = mysql.createPool({
// //     host: 'localhost',
// //     user: 'root',
// //     database: 'node_complete',
// //     password:'root'
// // });

// // module.exports = pool.promise();
// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node_complete', 'root', 'root', {dialect: 'mysql', host: 'localhost'});

// module.exports = sequelize;

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://pepo:pepo@cluster0-8uuhu.mongodb.net/test?retryWrites=true')
    .then(client => {
        console.log('Connected');
        _db = client.db();
        callback(client);
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
