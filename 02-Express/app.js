const express = require('express');
const Joi = require('joi');

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
  let user = searchUser(+request.params.id);
  if (!user) return response.status(404).send('User not found');
  response.send(user);
});

app.post('/api/users', (request, response) => {
  const { name } = request.body;
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  const { error } = schema.validate({ name: name });

  if (error) {
    return response.status(400).send(error.details[0].message);
  }

  const user = {
    id: users.length + 1,
    name: request.body.name,
  };
  users.push(user);
  response.send(user);
});

app.put('/api/users/:id', (request, response) => {
  let user = searchUser(+request.params.id);
  if (!user) return response.status(404).send('User not found');

  const { name } = request.body;
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  const { error } = schema.validate({ name: name });

  if (error) {
    return response.status(400).send(error.details[0].message);
  }

  user.name = name;
  response.send(user);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function searchUser(userId) {
  return users.find(({ id }) => id === userId);
}
