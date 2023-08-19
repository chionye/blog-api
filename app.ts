import * as dotenv from 'dotenv'
import express, { Application } from "express";
import serverless from 'serverless-http';
import { UserRouter } from './routes/user';
import { BlogRouter } from './routes/blog';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utils/swagger";

dotenv.config();
const app: Application = express();
const port = process.env.PORT;

app.use(express.json());


app.use("/users", UserRouter);
app.use("/posts", BlogRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default serverless(app);