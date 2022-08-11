var express = require('express');
var router = express.Router();

var task_controller = require('../controllers/taskController');

// GET request for all Tasks
router.get('/', task_controller.task_list_get);

// GET request for all Tasks for a specifc date.
router.get('/date/:year(\\d{4})-:month(\\d{2})-:day(\\d{2})', task_controller.task_list_specific_date_get);

// GET request for specific Task(s).
router.get('/:name', task_controller.task_search_get);

// POST request to create Task.
router.post('/', task_controller.task_create_post);

// PUT request to update Task.
router.put('/:id', task_controller.task_update_put);

// DELETE request to delete Task.
router.delete('/:id', task_controller.task_delete);

module.exports = router;
