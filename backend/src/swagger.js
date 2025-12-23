import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BikeBase API",
      version: "1.0.0",
      description: "API documentation for BikeBase application",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/routes/**/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
