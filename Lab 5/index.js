// описвуэмо роутер з використанням контролеру
const Router = require("express").Router;
const userController = require("./controller");

const userRouter = new Router();

//CRUD - визначаємо яку функцію викликати при якому запиту
userRouter.get("/", userController.getAll);
userRouter.get("/:id", userController.getById);
userRouter.delete("/:id", userController.delete);
userRouter.post("/", userController.post);
userRouter.patch("/:id", userController.patch);

//експортуэмо роутер
module.exports = userRouter;