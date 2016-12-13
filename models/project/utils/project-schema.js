const schema = {
    type: 'object',
    required: [
        'title',
        'color',
        'is_active',
        'owner',
        'participants'
    ],
    properties: {
        title: {
            type: 'string'
        },
        color: {
            type: 'string',
            pattern: '^#[\\da-f]{1,6}$'
        },
        is_active: {
            type: 'boolean'
        },
        owner: {
            type: 'object',
            required: [
                '_id',
                'name'
            ],
            properties: {
                _id: {},
                name: {
                    type: 'string'
                }
            }
        },
        participants: {
            type: 'array',
            items: {
                type: 'object',
                required: [
                    'participant',
                    'role'
                ],
                properties: {
                    role: {
                        enum: [
                            'admin',
                            'user'
                        ]
                    },
                    participant: {
                        type: 'object',
                        required: [
                            '_id',
                            'name'
                        ],
                        properties: {
                            _id: {},
                            name: {
                                type: 'string'
                            }
                        }
                    }
                }
            }
        }
    }
};

module.exports = schema;