module.exports = {
    type: 'object',
    required: [
        'tags',
        'user',
        'start_time'
    ],
    properties: {
        title: {
            type: 'string'
        },
        project: {
            type: 'object',
            required: [
                '_id',
                'title',
                'color',
                'is_active'
            ],
            properties: {
                _id: {},
                title: {
                    type: 'string'
                },
                color: {
                    type: 'string',
                    pattern: '^#[\\da-f]{1,6}$'
                },
                is_active: {
                    type: 'boolean'
                }
            }
        },
        tags: {
            type: 'array',
            uniqueItems: true,
            items: {
                type: 'string'
            }
        },
        user: {
            type: 'object',
            required: [
                '_id',
                'name',
            ],
            properties: {
                _id: {},
                name: {
                    type: 'string'
                }
            }
        },
        start_time: {
            type: 'number'
        },
        end_time: {
            type: 'number'
        }
    }
};