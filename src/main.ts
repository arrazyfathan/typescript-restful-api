import {logger} from "./application/logging";
import {app} from "./application/app";

app.listen(3000, () => {
    logger.info(`Server is running on port http://localhost:3000`);
})
