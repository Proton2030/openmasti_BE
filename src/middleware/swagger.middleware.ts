import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Swagger Example',
            version: '1.0.0',
            description: 'Example API with Swagger',
        },
    },
    apis: ['../api/v1/routes/routes.index.ts'], // Path to the API routes file(s)
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
