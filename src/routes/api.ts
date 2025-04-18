import express from "express";
import {authMiddleware} from "../middlewares/auth-middleware";
import {UserController} from "../controllers/user-controller";
import {ContactController} from "../controllers/contact-controller";
import {AddressController} from "../controllers/address-controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware)

// User API
apiRouter.get("/api/users/current", UserController.get);
apiRouter.patch("/api/users/current", UserController.update);
apiRouter.delete("/api/users/current", UserController.logout);


// Contact API
apiRouter.post("/api/contacts", ContactController.create);
apiRouter.get("/api/contacts/:contactId", ContactController.get);
apiRouter.put("/api/contacts/:contactId", ContactController.update);
apiRouter.delete("/api/contacts/:contactId", ContactController.remove);
apiRouter.get("/api/contacts", ContactController.search);

// Address API
apiRouter.post("/api/contacts/:contactId/addresses", AddressController.create);
apiRouter.get("/api/contacts/:contactId/addresses/:addressId", AddressController.get);
apiRouter.put("/api/contacts/:contactId/addresses/:addressId", AddressController.update);
apiRouter.delete("/api/contacts/:contactId/addresses/:addressId", AddressController.remove);
apiRouter.get("/api/contacts/:contactId/addresses", AddressController.list);