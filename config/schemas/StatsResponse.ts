export const StatsResponse = {
  type: 'object',
  properties: {
    launchesByYear: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          year: {
            type: 'integer',
          },
          count: {
            type: 'integer',
          },
          rockets: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
                count: {
                  type: 'integer',
                },
                condition: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    launchesByRocket: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          rocketName: {
            type: 'string',
          },
          condition: {
            type: 'string',
          },
          count: {
            type: 'integer',
          },
        },
      },
    },
    reusedCount: {
      type: 'integer',
    },
    newCount: {
      type: 'integer',
    },
    conditionUnknownCount: {
      type: 'integer',
    },
    successCount: {
      type: 'integer',
    },
    failureCount: {
      type: 'integer',
    },
    statusUnknownCount: {
      type: 'integer',
    },
  },
};
