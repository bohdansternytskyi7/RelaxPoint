const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'RelaxPoint',
  charset: 'utf8mb4'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Połączono z bazą danych');
});

app.post('/register', (req, res) => {
  const { name, surname, email, password, role = 'client' } = req.body;

  db.query('SELECT * FROM Users WHERE email = ?', [email], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      return res.status(400).json({ message: 'Użytkownik o tym emailu już istnieje.' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) throw err;
      const query = 'INSERT INTO Users (name, surname, email, password, role) VALUES (?, ?, ?, ?)';
      db.query(query, [name, surname, email, hashedPassword, role], (err, result) => {
        if (err) throw err;
        res.status(201).json({ message: 'Użytkownik zarejestrowany' });
      });
    });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM Users WHERE email = ?', [email], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(400).json({ message: 'Nie znaleziono użytkownika o tym emailu.' });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) {
        return res.status(400).json({ message: 'Nieprawidłowe hasło.' });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email, name: user.name, role: user.role },
        'secretKey',
        { expiresIn: '1h' }
      );

      res.json({
        message: 'Zalogowano pomyślnie!',
        token: token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
      });
    });
  });
});

app.get('/protected', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Brak tokenu' });
  }

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Nieprawidłowy token' });
    res.json({ message: 'Dostęp do chronionego zasobu!', user: decoded });
  });
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
