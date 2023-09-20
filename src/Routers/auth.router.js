const authRouter = require("express").Router();

const { register, login } = require("../Handlers/auth.handler");

authRouter.post("/", login);
authRouter.post("/register", register);

module.exports = authRouter;
