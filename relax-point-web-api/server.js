const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'RelaxPoint'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Połączono z bazą danych');
});

app.get('/services', (req, res) => {
  db.query('SELECT * FROM Services', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Serwer działa na: http://localhost:${port}`);
});
