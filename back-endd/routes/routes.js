let express = require('express');
//added new route to get specific details from given id
const router = express.Router();
var studentsController = require('../src/students/studentsController');
router.route('/students').post(studentsController.create);
router.route('/students').get(studentsController.get);
router.route('/students/:id').get(studentsController.get);
router.route('/students/:id').patch(studentsController.update);
router.route('/students/:id').delete(studentsController.expunge);
module.exports = router;