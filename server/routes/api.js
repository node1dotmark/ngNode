var express = require('express'),
    router = express.Router(),
    mysql = require('mysql');
// MongoClient = require('mongodb').MongoClient,
// ObjectID = require('mongodb').ObjectID;

// Connect using MongoDB
// const connection = (closure) => {
//     return MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
//         if(err) return console.log(err);

//         closure(db);
//     });
// }

// Connect using MySQL
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "dotmark",
    database: "users"
});

con.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});


// Error Handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
}

// Response Handling
let response = {
    status: 200,
    data: [],
    message: null
}

// Get Users
router.get('/users', (req, res) => {
    // [Mongo]
    // connection((db) => {
    //     db.collection('users')
    //     .find()
    //     .toArray()
    //     .then(
    //         (users) => {
    //         response.data = users;
    //         res.json(response); 
    //     })
    //     .catch((err) => {
    //         sendError(err, res);
    //     });
    // });
    // ================================
    con.query('SELECT * FROM health_level7', (err, result, fields) => {
        // res.send(result);
        if (err) {
            res.send(err);
        }
        response.data = result;
        res.json(response);
        console.log(result);
    });
});

module.exports = router;