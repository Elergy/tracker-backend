const Task = require('./../task-model');
const validateSchema = require('./../utils/validate-schema');
const getTaskInfo = require('./../utils/get-task-info');

const User = require('./../../../models/user/user-model');
const getProjectInfo = require('./../../../models/project/utils/get-project-info');
const {isParticipant} = require('./../../../models/project/utils/validate-rights');

/**
 * Edit information about a task
 *
 * @param {ObjectId} userId
 * @param {Number} taskId
 * @param {Object} taskData
 * @param {String} [taskData.title]
 * @param {Number} [taskData.project_id]
 * @param {String[]} [taskData.tags=[]]
 * @param {Number} [taskData.start_time=Date.now()] - start time in milliseconds
 * @param {Number} [taskData.end_time] - end time in milliseconds
 */
async function edit(userId, taskId, taskData) {
    const [task, user] = await Promise.all([
        Task.findById(taskId).populate('project'),
        User.findById(userId)
    ]);

    taskData = Object.assign(
        task,
        taskData,
        {user}
    );

    if (taskData.project_id) {
        const project = await getProjectInfo(taskData.project_id);
        if (!project) {
            throw new Error('A project is not found');
        }

        if (!isParticipant(project, userId)) {
            throw new Error('Current user has no permissions to edit the project');
        }

        task.project = project;
    }

    task.tags = task.tags.filter((tag, index) => {
        return task.tags.lastIndexOf(tag) === index;
    });

    if (!validateSchema(task)) {
        throw new Error('Task has wrong format');
    }

    await task.save();
    return [await getTaskInfo(task._id)];
}

module.exports = edit;