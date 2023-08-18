import * as dotenv from 'dotenv'
import express from "express";
import * as bodyParser from "body-parser";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});