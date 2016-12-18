const Task = require('./../task-model');
const validateSchema = require('./../utils/validate-schema');
const getTaskInfo = require('./../utils/get-task-info');

const User = require('./../../../models/user/user-model');
const getProjectInfo = require('./../../../models/project/utils/get-project-info');
const {isParticipant} = require('./../../../models/project/utils/validate-rights');

/**
 * Start tracking a new task
 * @param {ObjectId} userId
 * @param {Object} taskData
 * @param {String} [taskData.title]
 * @param {Number} [taskData.project_id]
 * @param {String[]} [taskData.tags=[]]
 * @param {Number} [taskData.start_time=Date.now()] - start time in milliseconds
 * @param {Number} [taskData.end_time] - end time in milliseconds
 */
async function create(userId, taskData) {
    taskData = Object.assign(
        {
            start_time: Date.now(),
            tags: []
        },
        taskData,
        {
            user: await User.findById(userId),
        }
    );

    if (taskData.project_id) {
        const project = await getProjectInfo(taskData.project_id);
        if (!project) {
            throw new Error('A project is not found');
        }

        if (!isParticipant(project, userId)) {
            throw new Error('Current user has no permissions to edit the project');
        }

        taskData.project = project;
    }

    taskData.tags = taskData.tags.filter((tag, index) => {
        return taskData.tags.lastIndexOf(tag) === index;
    });

    let task = new Task(taskData);
    if (!validateSchema(task)) {
        throw new Error('Task has wrong format');
    }

    let taskWithoutEndDateQuery = Task.findOneAndUpdate({
        end_time: null,
        user: userId
    }, {
        end_time: taskData.start_time
    }).exec();

    let taskWithoutEndDate;

    [task, taskWithoutEndDate] = await Promise.all([task.save(), taskWithoutEndDateQuery]);

    const promises = [getTaskInfo(task._id)];
    if (taskWithoutEndDate) {
        promises.push(getTaskInfo(taskWithoutEndDate._id));
    }

    return await Promise.all(promises);
}

module.exports = create;