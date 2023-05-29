const { Router } = require('express');
const {
  usersGet,
  usersGetById,
  usersPut,
  usersPost,
} = require('../controllers/users.controller.js');

const router = Router();

router.get('/', usersGet);

router.get('/:id', usersGetById);

router.post('/', usersPost);

router.put('/:id', usersPut);

module.exports = router;
