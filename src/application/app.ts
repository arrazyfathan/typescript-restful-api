import express from "express";
import { publicRouter } from "../route/public-api";
import { errorMiddleware } from "../middleware/error-middleware";
import {logger} from "./logging";

export const app = express();
app.use(express.json());
app.use(publicRouter);
app.use(errorMiddleware);


app.listen(3000, () => {
    logger.info(`Server is running on port http://localhost:3000`);
})
