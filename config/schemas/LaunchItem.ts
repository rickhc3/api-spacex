export const LaunchItem = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    flight_number: {
      type: 'integer',
    },
    name: {
      type: 'string',
    },
    date_utc: {
      type: 'string',
      format: 'date-time',
    },
    success: {
      type: 'boolean',
    },
    reused: {
      type: 'boolean',
    },
    youtube_link: {
      type: 'string',
    },
    rocket_id: {
      type: 'integer',
    },
    links_patch_small: {
      type: 'string',
    },
    links_patch_large: {
      type: 'string',
    },
    presskit: {
      type: 'string',
    },
    wikipedia: {
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
    rocket: {
      $ref: '#/components/schemas/RocketItem',
    },
  },
};
