export default {
    type: "object",
    properties: {
      id: { type: 'string' },
      role: { type: 'string' },
    },
    required: ['id', 'role']
  } as const;
  