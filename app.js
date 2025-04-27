const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 80;

app.set('view engine', 'ejs');

// Koneksi ke database RDS
const db = mysql.createConnection({
    host: 'ecommerce-uts.cpckscy4qiwg.ap-southeast-2.rds.amazonaws.com',
    user: 'admin',
    password: 'Pass1234!',
    database: 'ecommerce'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database!');
});

// Route utama
app.get('/', (req, res) => {
    db.query('SELECT * FROM produk', (err, results) => {
        if (err) throw err;
        res.render('index', { products: results });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});