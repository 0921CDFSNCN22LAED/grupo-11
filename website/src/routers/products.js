const express = require("express");
const router = express.Router();
const path = require("path");
const productsController = require("../controllers/productsController");
const multerMiddleware = require("../middlewares/multerMiddleware");
const userLoggedMiddleware = require("../middlewares/userLoggedMiddleware");
const validateProdMiddleware = require("../middlewares/validateProdMiddleware");
const validateUpdMiddleware = require("../middlewares/validateUpdMiddleware");
const carritoController = require("../controllers/carritoController");
const authMiddleware = require("../middlewares/authMiddleware");
/*** GET ALL PRODUCTS ***/
router.get("/", userLoggedMiddleware, productsController.collections);

/*** CREATE ONE PRODUCT ***/
router.get("/create", productsController.create);
router.post(
    "/",
    multerMiddleware.array("image", [3]),
    validateProdMiddleware,
    productsController.store
);

/*** GET ONE PRODUCT ***/
router.get("/:id/", userLoggedMiddleware, productsController.detail);
router.post("/:id/", authMiddleware, productsController.addToCart);

/*** EDIT ONE PRODUCT ***/
router.get("/:id/edit", productsController.edit);
router.put(
    "/:id",
    [multerMiddleware.array("image", [3]), validateUpdMiddleware],
    productsController.update
);

/*** DELETE ONE PRODUCT***/
router.delete("/:id", productsController.destroy);

//CARRITO AGREGAR ITEM
router.get("/agregarCarrito/:id", carritoController.agregarItem);

//Quitar Item
router.get("/quitarCarrito/:id", carritoController.quitarItem);

//Mostrar carrito
router.get("/listarCarrito", carritoController.mostrarCarrito);

module.exports = router;
