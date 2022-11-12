const Router = require("express").Router;
const userController = require("./controller");

const userRouter = new Router();

userRouter.get("/", userController.getAll);
userRouter.get("/:id", userController.getById);
userRouter.delete("/:id", userController.delete);
userRouter.post("/", userController.post);
userRouter.patch("/:id", userController.patch);

module.exports = userRouter;