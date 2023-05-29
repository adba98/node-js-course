const { response, request } = require('express');
const Joi = require('joi');

const users = [
  { id: 1, name: 'Oscar' },
  { id: 2, name: 'Juan' },
  { id: 3, name: 'Pedro' },
];

const searchUser = (userId) => {
  return users.find(({ id }) => id === userId);
};

const validateUser = (name) => {
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  return schema.validate({ name });
};

const usersGet = (_, res = response) => {
  res.json(users);
};

const usersGetById = (req = request, res = response) => {
  const { id } = req.params;
  const user = searchUser(+id);
  if (!user) return res.status(404).send('User not found');
  res.json(user);
};

const usersPost = (req = request, res = response) => {
  const { name } = req.body;
  const { error } = validateUser(name);
  if (error) return res.status(400).send(error.details[0].message);

  const user = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(user);
  res.json(user);
};

const usersPut = (req = request, res = response) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = searchUser(+id);
  if (!user) return res.status(404).send('User not found');

  const { error } = validateUser(name);
  if (error) return res.status(400).send(error.details[0].message);

  user.name = name;
  res.json(user);
};

module.exports = {
  usersGet,
  usersGetById,
  usersPut,
  usersPost,
};
