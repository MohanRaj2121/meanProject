var express = require('express');
//added new route to get specific details from given id
const router = express.Router();
var usersController = require('../src/users/usersController');
router.route('/users').post(usersController.create);
router.route('/users').get(usersController.get);
router.route('/users/:id').get(usersController.get);
router.route('/users/:id').patch(usersController.update);
router.route('/users/:id').delete(usersController.expunge);
module.exports = router;