import { Router } from "express";

import ListAddressController from "../../app/Controllers/AddressApi/ListAddressController.js";
import GetAddressController from "../../app/Controllers/AddressApi/GetAddressController.js";
import CreateAddressController from "../../app/Controllers/AddressApi/CreateAddressController.js";
import UpdateAddressController from "../../app/Controllers/AddressApi/UpdateAddressController.js";
import DeleteAddressController from "../../app/Controllers/AddressApi/DeleteAddressController.js";

const addressRouter = Router();

addressRouter.get("/", new ListAddressController().handle);

addressRouter.get("/:id", new GetAddressController().handle);

addressRouter.post("/", new CreateAddressController().handle);

addressRouter.put("/:id", new UpdateAddressController().handle);

addressRouter.delete("/:id", new DeleteAddressController().handle);

export default addressRouter;