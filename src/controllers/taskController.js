var Task = require('../models/task');

/**
 * Display list of all tasks. (A collection)
 */
exports.task_list_get = function (req, res, next) {
  Task.find().populate('tags').exec((err, list_task) => {
    if (err || (!list_task || !list_task.length)) {
      res.status(400).json({ message: `No tasks` });
      // return next(err)
    } else {
      res.json(list_task);
    }
  });
};

/**
 * Get all tasks for a specifc date. (Specific member of a collection)
 */
exports.task_list_specific_date_get = function (req, res, next) {
  const p = req.params;
  const date = `${p.year}-${p.month}-${p.day}`;
  Task.find({
    date:
    {
      $gte: new Date(date).setHours(0, 0, 0, 0),
      $lt: new Date(date).setHours(23, 59, 59, 9999)
    }
  }).populate('tags').exec((err, list_task) => {
    if (err || (!list_task || !list_task.length)) {
      res.status(400).json({ message: `No tasks for the date ${date}` });
      // return next(err)
    } else {
      res.json(list_task);
    }
  });
}


/**
 * Get all tasks for a specifc name. (Specific member of a collection)
 */
exports.task_search_get = function (req, res, next) {
  Task.find({ name: { $regex: req.params.name, $options: "gmi" } }).populate('tags').exec((err, list_task) => {
    if (err || (!list_task || !list_task.length)) {
      res.status(400).json({ message: `No tasks found` });
      // return next(err)
    } else {
      res.json({ message: `Successfully found tasks`, tasks: list_task });
    }
  });
}

/**
 * Create a Task on POST
 */
exports.task_create_post = function (req, res, next) {
  const newTask = new Task({
    name: req.body.name,
    tags: [],
    periods: [],
    date: Date.now()
  });

  newTask.save((err) => {
    if (err) {
      res.status(400).json({ message: "Error creating task" });
    } else {
      res.json({ message: "Successfully created task", task: newTask });
    }
  });
}

/**
 * Update a Task on PUT
 */
exports.task_update_put = function (req, res, next) {
  const update_object = req.body;
  Task.findByIdAndUpdate(req.params.id, update_object, { new: true }, (err, updated_task) => {
    if (err || !updated_task) {
      res.status(400).json({ message: "Error updating task" });
      // return next(err)
    } else {
      res.json({ message: "Successfully updated task", task: updated_task });
    }
  });
}

/**
 * Remove a Task on DELETE
 */
exports.task_delete = function (req, res, next) {
  Task.findByIdAndDelete(req.params.id, (err, deleted_task) => {
    if (err || !deleted_task) {
      res.status(400).json({ message: "Error deleting task" });
      // return next(err)
    } else {
      res.json({ message: "Successfully deleted task", task: deleted_task });
    }
  });
}