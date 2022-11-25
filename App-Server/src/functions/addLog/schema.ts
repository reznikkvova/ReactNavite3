export default {
  type: "object",
  properties: {
    id: { type: 'string' },
    asset_tag: { type: 'string' },
    date: { type: 'string' },
    tech: { type: 'string' },
    description: { type: 'string' },
    problemType: { type: 'string' },
  },
  required: ['id']
} as const;
