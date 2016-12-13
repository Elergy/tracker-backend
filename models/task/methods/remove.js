const Task = require('./../task-model');

/**
 * Remove a task
 *
 * @param {ObjectId} userId
 * @param {Number} taskId
 */
async function remove(userId, taskId) {
    const task = await Task.findById(taskId);

    if (!task) {
        throw new Error('A task is not found');
    }

    if (!task.user.equals(userId)) {
        throw new Error('Current user has no permissions to remove the task');
    }

    return Task.findByIdAndRemove(taskId).exec();
}

module.exports = remove;