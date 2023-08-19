import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import { version } from "../package.json";
import { config } from "../config/config";

const configVar = config();

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "BLOG REST API Documentation",
      version,
    },
    servers: [
        {
            url: `http://localhost:${configVar?.port}`,
        },
    ],
  },
  apis: ["./routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);