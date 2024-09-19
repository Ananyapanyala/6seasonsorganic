const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

// Mock user data (we can replace this with DynamoDB operations)
let users = [
  {
    email: 'john_doe@example.com',
    password: '$2a$10$NwbiWI4YdZXt3VYzD2kYk.5yWkQKKTTtB8Bd03vC8d/qSzwO7jK8y' 
  }
];


app.use(cors({
  origin: 'http://localhost:3000' 
}));
app.use(express.json());

// JWT Secret
const jwtSecret = 'your_jwt_secret_key';

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token.split(' ')[1], jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Login route
app.post('/api/auth/login', async (req, res) => {
  console.log('Login Request Body:', req.body); // Log the request body

  const { email, password } = req.body;

  // Check for missing fields
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = users.find(user => user.email === email);
    console.log('User found:', user);

    if (!user) {
      console.log('User not found');
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('Stored hashed password:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      console.log('Passwords do not match');
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ email: user.email }, jwtSecret); // Adjusted payload
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


let expenses = [
  { id: 1, description: 'Groceries', amount: 50, date: '2024-08-10', category: 'Food' },
  { id: 2, description: 'Bus Ticket', amount: 20, date: '2024-08-11', category: 'Transport' },
];


app.get('/api/expenses', authenticateToken, (req, res) => {
  res.json(expenses);
});

app.post('/api/expenses', authenticateToken, (req, res) => {
  const newExpense = req.body;
  newExpense.id = expenses.length ? Math.max(expenses.map(e => e.id)) + 1 : 1;
  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

app.put('/api/expenses/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const updatedExpense = req.body;
  let expense = expenses.find(e => e.id === id);

  if (expense) {
    Object.assign(expense, updatedExpense);
    res.json(expense);
  } else {
    res.status(404).json({ message: 'Expense not found' });
  }
});

app.delete('/api/expenses/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = expenses.length;
  expenses = expenses.filter(e => e.id !== id);

  if (expenses.length < initialLength) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Expense not found' });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
