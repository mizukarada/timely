var express = require('express');
var router = express.Router();

var tag_controller = require('../controllers/tagController');

// GET request for all Tag
router.get('/', tag_controller.tag_list_get);  

// GET request for specific Tag(s).
router.get('/:name', tag_controller.tag_subset_get);  

// POST request to create Tag.
router.post('/', tag_controller.tag_create_post);

// PUT request to update Tag.
router.put('/:id', tag_controller.tag_update_put);

// DELETE request to delete Tag.
router.delete('/:id', tag_controller.tag_delete);

module.exports = router;
