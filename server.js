const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'mutanu@Mysql01', // Replace with your MySQL password
  database: 'toti_solar', // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Route to handle form submissions
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Error saving data.');
    }
    res.status(200).send('Thank you for your message! We will get back to you soon.');
  });
});

// Route for handling order form submission
app.post('/submit_order', (req, res) => {
    const { paymentMethod, deliveryLocation, paymentOption } = req.body;

    const order = {
        paymentMethod: paymentMethod,
        deliveryLocation: deliveryLocation,
        paymentOption: paymentOption
    };

    // Save order to the database
    const sql = 'INSERT INTO orders (paymentMethod, deliveryLocation, paymentOption) VALUES (?, ?, ?)';
    db.query(sql, [order.paymentMethod, order.deliveryLocation, order.paymentOption], (err, result) => {
        if (err) throw err;
        console.log('Order placed successfully');
        res.send('Your order has been placed successfully!');
    });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
