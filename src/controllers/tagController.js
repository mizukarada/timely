var Tag = require('../models/tag');


/**
 * Display list of all tags. (A collection)
 */
exports.tag_list_get = function (req, res, next) {
  Tag.find().exec((err, list_tag) => {
    if (err || (!list_tag || !list_tag.length)) {
      res.status(400).json({ message: `No tags` });
      // return next(err)
    } else {
      res.json(list_tag);
    }
  });
};


/**
 * Get all tags for a specifc name. (Specific member of a collection)
 */
exports.tag_subset_get = function (req, res, next) {
  Tag.find({ name: { $regex: req.params.name, $options: "gmi" } }).populate('tags').exec((err, list_tag) => {
    if (err || (!list_tag || !list_tag.length)) {
      res.status(400).json({ message: `No tags` });
      // return next(err)
    } else {
      res.json(list_tag);
    }
  });
}

/**
 * Create a Tag on POST
 */
exports.tag_create_post = function (req, res, next) {
  const newTag = new Tag({
    name: req.body.name,
    date_created: Date.now()
  });

  newTag.save((err) => {
    if (err) {
      res.status(400).json({ message: "Error creating tag" });
    } else {
      res.json({ message: "Successfully created tag", tag: newTag });
    }
  });
}

/**
 * Update a Tag on PUT
 */
exports.tag_update_put = function (req, res, next) {
  const update_object = req.body;
  Tag.findByIdAndUpdate(req.params.id, update_object, { new: true }, (err, updated_tag) => {
    if (err || !updated_tag) {
      res.status(400).json({ message: "Error updating tag" });
      // return next(err)
    } else {
      res.json({ message: "Successfully updated tag", tag: updated_tag });
    }
  });
}

/**
 * Remove a Tag on DELETE
 */
exports.tag_delete = function (req, res, next) {
  Tag.findByIdAndDelete(req.params.id, (err, deleted_tag) => {
    if (err || !deleted_tag) {
      res.status(400).json({ message: "Error deleting tag" });
      // return next(err)
    } else {
      res.json({ message: "Successfully deleted tag", tag: deleted_tag });
    }
  });
}