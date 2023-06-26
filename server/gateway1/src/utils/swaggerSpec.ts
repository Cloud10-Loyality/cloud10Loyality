import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Gateway1",
    version: "1.0.0",
    description: "Gateway1 API Documentation",
  },
  servers: [
    {
      url: "http://cloud10lms.com/api/v1/reservation",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
