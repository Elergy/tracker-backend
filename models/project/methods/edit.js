const getProjectInfo = require('./../utils/get-project-info');
const {hasAdminRights} = require('./../utils/validate-rights');
const validateSchema = require('./../utils/validate-schema');

const fieldsAllowedToEdit = [
    'title',
    'color',
    'is_active'
];

async function edit(userId, projectId, newParameters) {
    const forbiddenParameters = Object
        .keys(newParameters)
        .filter((parameter) => !fieldsAllowedToEdit.includes(parameter));

    if (forbiddenParameters.length) {
        throw new Error(`${forbiddenParameters} can not been saved to Project`);
    }

    const project = await getProjectInfo(projectId);

    if (!project) {
        throw new Error('A project is not found');
    }

    if (!hasAdminRights(project, userId)) {
        throw new Error('Current user has no permissions to edit the project');
    }

    Object.assign(project, newParameters);

    if (!validateSchema(project)) {
        throw new Error('Project has invalid format');
    }

    return project.save();
}

module.exports = edit;