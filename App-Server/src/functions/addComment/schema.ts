export default {
  type: "object",
  properties: {
    id: { type: 'string' },
    memo_id: { type: 'string' },
    date: { type: 'string' },
    user: { type: 'string' },
    message: { type: 'string' },
  },
  required: ['id']
} as const;
