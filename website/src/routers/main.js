const express = require("express");
const router = express.Router();
const path = require("path");
const mainController = require("../controllers/mainController");
const validateRegMiddleware = require("../middlewares/validateRegMiddleware");
const multerMiddlewareUsers = require("../middlewares/multerMiddlewareUsers");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");


router.get("/", mainController.home);
router.get("/cart", authMiddleware, mainController.cart);
router.get("/login", guestMiddleware, mainController.login);
router.post("/login", mainController.loginProcess);
router.get("/register", guestMiddleware, mainController.register);
router.post(
    "/register",
    [multerMiddlewareUsers.single("image"), validateRegMiddleware],
    mainController.cRegister
);
router.get("/search", mainController.search);
router.get("/profile", authMiddleware, mainController.profile);
router.get("/logout", mainController.logout);

module.exports = router;
