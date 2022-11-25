export default {
  type: "object",
  properties: {
    id: { type: 'string' },
    date: { type: 'string' },
    asset_tag: { type: 'string' },
    issue: { type: 'string' },
    room: { type: 'string' },
    technician: { type: 'string' },
    status: { type: 'string' },
  },
  required: ['id']
} as const;
