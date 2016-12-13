const Ajv = require('ajv');
const ajv = new Ajv();

const schema = require('./project-schema.js');

function validateSchema(project) {
    return ajv.validate(schema, project);
}

module.exports = validateSchema;