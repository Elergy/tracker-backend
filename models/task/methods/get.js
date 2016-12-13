const Task = require('./../task-model');
const validateSchema = require('./../utils/validate-schema');
const getTaskInfo = require('./../utils/get-task-info');

const User = require('./../../../models/user/user-model');
const getProjectInfo = require('./../../../models/project/utils/get-project-info');
const {isParticipant} = require('./../../../models/project/utils/validate-rights');

/**
 * Get all information about tasks by given query
 *
 * @param {ObjectId} userId
 * @param {Object} query
 * @param {Number} [query.limit=30] - maximum amount of tasks
 * @param {Number} [query.start_time] - minimum time a task should be started on
 * @param {Number} [query.end_time] - maximum time a task should be started on
 * @param {Number[]} [query.projects] - an array project ids a task should belong to
 * @param {String[]} [query.tags] - an array of tags a task should contain
 * @param {Boolean} [query.for_user_only=true] - true if we need to get tasks only current user has tracked
 */
async function get(userId, query) {
    const limit = Math.min(parseInt(query.limit) || 30, 30);
    const forUserOnly = typeof query.for_user_only === 'undefined' ? true : query.for_user_only;

    const mongoQuery = {};
    if (forUserOnly) {
        mongoQuery.user = userId;
    }
    if (Number.isInteger(Number(query.start_time))) {
        mongoQuery.start_time = {
            $gt: query.start_time
        };
    }

    if (Number.isInteger(Number(query.end_time))) {
        mongoQuery.start_time = Object.assign(mongoQuery.start_time, {
            $lt: query.end_time
        });
    }

    if (Array.isArray(query.projects)) {
        mongoQuery.project = {
            $in: query.projects
        };
    }

    if (Array.isArray(query.tags)) {
        mongoQuery.tags = {
            $all: query.tags
        };
    }

    const tasks = await Task.find(mongoQuery, '-__v', {
        limit,
        sort: '-start_time'
    })
        .populate({
            path: 'user',
            select: '_id name'
        })
        .populate({
            path: 'project',
            select: '_id title color participants'
        })
        .exec();

    if (hasSomeForbiddenTask(tasks, userId, forUserOnly)) {
        throw new Error('User has no permissions to read the response');
    }

    return tasks;
}

/**
 * return true if user has no permission to get some of those tasks
 *
 * @param {Object[]} tasks
 * @param {Object} tasks[].user
 * @param {ObjectId} tasks[].user._id
 * @param {Object} tasks[].project
 * @param {Object[]} tasks[].project.participants
 * @param {ObjectId} tasks[].project.participants[].participant
 *
 * @param {ObjectId} userId
 *
 * @param {Boolean} forUserOnly - if true, userId should be exact same as tasks[].user._id
 *      if false - we can that user has permissions to read tasks from tasks[].project
 */
function hasSomeForbiddenTask(tasks, userId, forUserOnly) {
    return tasks.some((task) => {
        if (task.user._id.equals(userId)) {
            return false;
        }

        if (forUserOnly) {
            return true;
        }

        if (task.project) {
            return task.project.participants.some((info) => {
                return info.participant.equals(userId);
            });
        }

        return true;
    });

}

module.exports = get;