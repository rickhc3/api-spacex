export const RocketItem = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    name: {
      type: 'string',
    },
    rocket_id: {
      type: 'string',
    },
    created_at: {
      type: 'string',
      format: 'date-time',
    },
    updated_at: {
      type: 'string',
      format: 'date-time',
    },
  },
};
