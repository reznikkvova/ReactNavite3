export default {
  type: "object",
  properties: {
    id: { type: 'string' },
    assetName: { type: 'string' },
    asset_tag: { type: 'string' },
    deviceGroup: { type: 'string' },
    model: { type: 'string' },
    assignee: { type: 'string' },
    date_issued: { type: 'string' },
    date_decomission: { type: 'string' },
    department: { type: 'string' },
    typeOS: { type: 'string' },
    roomNumber: { type: 'string' },
    make: { type: 'string'}
  },
  required: ['id', 'assetName']
} as const;
