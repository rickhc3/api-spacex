import { SwaggerConfig } from '@ioc:Adonis/Addons/Swagger';
import { LaunchsResponse } from './schemas/LaunchsResponse';
import { LaunchItem } from './schemas/LaunchItem';
import { StatsResponse } from './schemas/StatsResponse';
import { RocketItem } from './schemas/RocketItem';

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
          LaunchsResponse,
          LaunchItem,
          StatsResponse,
          RocketItem,
        },
  },
  info: {
    title: 'Gerenciamento de Lançamentos de Foguetes SpaceX',
    version: '1.0.0',
    description: 'API para listar os lançamentos de foguetes relacionados da SpaceX, fornecendo endpoints para listar lançamentos e obter estatísticas sobre eles.',
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
