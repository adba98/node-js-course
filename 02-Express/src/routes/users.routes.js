const { Router } = require('express');
const {
  usersGet,
  usersGetById,
  usersPut,
  usersPost,
  usersDelete,
} = require('../controllers/users.controller.js');

const router = Router();

router.get('/', usersGet);

router.get('/:id', usersGetById);

router.post('/', usersPost);

router.put('/:id', usersPut);

router.delete('/:id', usersDelete);

module.exports = router;
