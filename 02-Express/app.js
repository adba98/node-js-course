const express = require('express');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const users = [
  { id: 1, name: 'Oscar' },
  { id: 2, name: 'Juan' },
  { id: 3, name: 'Pedro' },
];

app.get('/api/users', (_, response) => {
  response.send(users);
});

app.get('/api/users/:id', (request, response) => {
  let user = users.find(({ id }) => id === +request.params.id);
  if (!user) return response.status(404).send('User not found');
  response.send(user);
});

app.get('/api/users/:year/:month', (request, response) => {
  const { params, query } = request;
  response.send({ params, queryString: query });
});

app.post('/api/users', (request, response) => {
  const { name } = request.body;
  if (!name || name.length <= 2) {
    return response.status(400).send('Enter a valid name');
  }
  const user = {
    id: users.length + 1,
    name: request.body.name,
  };
  users.push(user);
  response.send(user);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
