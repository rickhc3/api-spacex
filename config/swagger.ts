import { SwaggerConfig } from '@ioc:Adonis/Addons/Swagger';

export default {
  uiEnabled: true,
  uiUrl: 'docs',
  specEnabled: true,
  specUrl: '/swagger.json',
  middleware: [],
  options: {
    definition: {
      openapi: '3.0.0',
      components: {
        schemas: {
          LaunchsResponse: {
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
          },
          LaunchItem: {
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
              }
            },
          },
          StatsResponse: {
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
          },
          RocketItem: {
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
          },
        },
  },
  info: {
    title: 'Gerenciamento de Lançamentos de Foguetes SpaceX',
    version: '1.0.0',
    description: 'Este componente gerencia os lançamentos de foguetes relacionados à SpaceX, fornecendo endpoints para listar lançamentos e obter estatísticas sobre eles.',
  },
},
apis: [
  'app/**/*.ts',
  'docs/swagger/**/*.yml',
  'start/routes.ts',
],
  basePath: '/',

  },
mode: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'RUNTIME',
  specFilePath: 'docs/swagger.json',
} as SwaggerConfig;
