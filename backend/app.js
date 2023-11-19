const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
let cors = require("cors");

const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());

const userData = JSON.parse(fs.readFileSync('users.json', 'utf8'));

app.get('/api/users', (req, res) => {

  res.json(userData);
});

app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = userData.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});


app.post('/api/users', (req, res) => {
  const newUser = req.body;
  userData.push(newUser);

  fs.writeFileSync('users.json', JSON.stringify(userData, null, 2));

  res.json(newUser);
});

app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;


  const userIndex = userData.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  userData[userIndex] = { ...userData[userIndex], ...updatedUser };

  fs.writeFileSync('users.json', JSON.stringify(userData, null, 2));

  res.json(userData[userIndex]);
});

app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;

  const filteredUsers = userData.filter((u) => u.id !== userId);

  if (filteredUsers.length === userData.length) {
    return res.status(404).json({ error: 'User not found' });
  }

  fs.writeFileSync('users.json', JSON.stringify(filteredUsers, null, 2));

  res.json({ message: 'User deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
