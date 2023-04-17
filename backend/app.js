const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();
var cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
// Database setup
const db = new sqlite3.Database("database.db");
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT UNIQUE, password TEXT)"
  );
});

// Routes
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  db.run(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashedPassword],
    (err) => {
      if (err) {
        res.status(500).json({ message: "An error occurred" });
      } else {
        res.status(201).json({ message: "User created" });
      }
    }
  );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
    if (err) {
      res.status(500).json({ message: "An error occurred" });
    } else if (!row) {
      res.status(401).json({ message: "Email or password is incorrect" });
    } else {
      const passwordIsValid = bcrypt.compareSync(password, row.password);

      if (!passwordIsValid) {
        res.status(401).json({ message: "Email or password is incorrect" });
      } else {
        const token = jwt.sign({ id: row.id }, "secret", {
          expiresIn: 86400, // Expires in 24 hours
        });

        res.status(200).json({ auth: true, token: token });
      }
    }
  });
});

app.get("/profile", (req, res) => {
  const token = req.headers["x-access-token"];
  
  if (!token) {
    return res.status(401).json({ auth: false, message: "No token provided" });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(500).json({ auth: false, message: "Failed to authenticate token" });
    }

    db.get("SELECT * FROM users WHERE id = ?", [decoded.id], (err, row) => {
      if (err) {
        res.status(500).json({ message: "An error occurred" });
      } else if (!row) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json({ id: row.id, email: row.email });
      }
    });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
