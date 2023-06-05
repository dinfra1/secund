const { getAll, create, oneUser, remove, Update } = require('../controllers/user.controllers');
const express = require('express');

const userRouter = express.Router();

userRouter.route("/")
		.get(getAll)
        .post(create)

userRouter.route("/:id")
    .get(oneUser)
	.delete(remove)
	.put(Update)


module.exports = userRouter;