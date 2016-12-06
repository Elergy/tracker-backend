const assert = require('assert');
const Ajv = require('ajv');
const ajv = new Ajv();

const _getProjectInfo = require('./../utils/_get-project-info');
const {hasAdminRights} = require('./../utils/_validate-rights');
const projectSchema = require('./../utils/project.schema');

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

    const project = await _getProjectInfo(projectId);

    if (!project) {
        throw new Error('A project is not found');
    }

    if (!hasAdminRights(project, userId)) {
        throw new Error('Current user has no permissions to edit the project');
    }

    Object.assign(project, newParameters);

    assert(ajv.validate(projectSchema, project), ajv.errorsText());

    return project.save();
}

module.exports = edit;