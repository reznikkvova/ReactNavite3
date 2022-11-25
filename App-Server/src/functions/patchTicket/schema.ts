export default {
  type: "object",
  properties: {
    id: { type: 'string' },
    what: { type: 'string' },
    change: { type: 'string' },
  },
  required: ['id', 'what', 'change']
} as const;
