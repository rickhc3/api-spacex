export const LaunchsResponse = {
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/LaunchItem',
      },
    },
    totalDocs: {
      type: 'integer',
    },
    page: {
      type: 'integer',
    },
    totalPages: {
      type: 'integer',
    },
    hasNext: {
      type: 'boolean',
    },
    hasPrev: {
      type: 'boolean',
    },
  },
};
