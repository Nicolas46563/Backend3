import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API para gestionar productos y carritos en un e-commerce.',
    },
    servers: [
      {
        url: 'http://localhost:8580',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

export default swaggerSpecs;
