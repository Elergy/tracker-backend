const Ajv = require('ajv');
const ajv = new Ajv();

const schema = require('./task-schema');

function validateSchema(task) {
    return ajv.validate(schema, task);
}

module.exports = validateSchema;