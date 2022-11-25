export default {
  type: "object",
  properties: {
    id: { type: 'string' },
    password: { type: 'string' },
    name: { type: 'string' },
    role: { type: 'string' },
    status: { type: 'string' },
  },
  required: ['id']
} as const;
