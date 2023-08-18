import * as dotenv from 'dotenv'
import express from "express";
import * as bodyParser from "body-parser";
import { UserRouter } from './routes/user';
import { BlogRouter } from './routes/blog';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use("/users", UserRouter);
app.use("/posts", BlogRouter);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});