import * as dotenv from 'dotenv'
import express from "express";
import * as bodyParser from "body-parser";
import { router } from './routes/user';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use("/users", router);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});