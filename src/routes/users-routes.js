import { validateRequest } from "../middleware/auth.js";
import * as UserController from "../controllers/user-controller.js";

import multer from "fastify-multer";
import path from 'path'

const storage = multer.diskStorage({
  destination: (request, reply, callback) => {
    callback(null, "public/images");
  },
  filename: (request, file, callback) => {
    const extension = path.extname(file.originalname);
    callback(null, file.originalname + "-" + Date.now() + extension);
  },
});

const upload = multer({ storage });

export default {
  getAllUsers: {
    method: "GET",
    url: "/user",
    preHandler: [validateRequest],
    handler: UserController.getAllUsers,
  },
    getUser: {
    method: "GET",
    url: "/user/:id",
    preHandler: [validateRequest],
    handler: UserController.getUser,
  },
  patchUser: {
    method: "PATCH",
    url: "/user/:id",
    preHandler: [validateRequest],
    preHandler: upload.single("image"),
    handler: UserController.patchUser,
},
updateProfilePhoto: {
  method: "PATCH",
  url: "/users/:id",
  preHandler: upload.single("image"),
  handler: UserController.updateProfilePhoto,
},
};