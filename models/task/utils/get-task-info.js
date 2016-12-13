const Task = require('./../task-model');

/**
 * get information about a task
 * @param taskId
 * @returns {Promise.<Object>}
 */
function getTaskInfo(taskId) {
    return Task
        .findById(taskId, '-__v')
        .populate({
            path: 'user',
            select: '_id name'
        })
        .populate({
            path: 'project',
            select: '_id title color'
        })
        .exec();
}

module.exports = getTaskInfo;