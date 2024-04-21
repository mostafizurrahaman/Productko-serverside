const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyJWT } = require("../middlewares/verifyJWT.middleware");
const { authorization } = require("../middlewares/authorization.middleware");
router.route("/me").get(verifyJWT, userController.getMe);

router.route("/jwt").get(userController.getJWT);
router.route("/sign-up").post(userController.signUp);
router
   .route("/")
   .get(verifyJWT, authorization("admin"), userController.getAllUsers);



router
   .route("/:id")
   .get(verifyJWT, authorization("admin"), userController.getUserById)
   .patch(verifyJWT, authorization("admin"), userController.updateUserById)
   .delete(verifyJWT, authorization("admin"), userController.deleteUserById);

module.exports = router;
