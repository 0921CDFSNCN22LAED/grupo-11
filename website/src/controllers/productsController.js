const productService = require("../services/products");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const db = require("../database/models");

const controller = {
    collections: async function (req, res) {
        let gender = req.query.gender;

        res.render("collections", {
            products:
                gender == undefined
                    ? await productService.getAll()
                    : await productService.getAllCollection(gender),
            user: req.session.userLogged,
            pageTitle: "Productos - Mirrorlens",
        });
    },

    detail: async (req, res) => {
        const id = req.params.id;
        const product = await productService.findOne(id);
        if (product) {
            res.render("detail2", {
                product,
                user: req.session.userLogged,
                pageTitle: product.name + " - Mirrorlens",
                products: await productService.getAll(),
                columnNamesBorder: productService
                    .tableNames(db.ProductBorderColor)
                    .filter((columnName) => {
                        return columnName != "id";
                    }),
                columnNamesGlass: productService
                    .tableNames(db.ProductGlassColor)
                    .filter((columnName) => {
                        return columnName != "id";
                    }),
            });
        } else {
            res.render("not-found");
        }
    },

    addToCart: async (req, res) => {
        await productService.addToCart(req.body);
        res.redirect(`/collections/${req.body.product_id}`);
        console.log("product added succesfully");
    },

    create: async function (req, res) {
        res.render("createProd", {
            pageTitle: "Crea tu producto",
            columnNamesBorder: productService
                .tableNames(db.ProductBorderColor)
                .filter((columnName) => {
                    return columnName != "id";
                }),
            columnNamesGlass: productService
                .tableNames(db.ProductGlassColor)
                .filter((columnName) => {
                    return columnName != "id";
                }),
        });
    },

    store: async function (req, res) {
        const resultValidation = validationResult(req);
        console.log(resultValidation);
        if (resultValidation.errors.length > 0) {
            return res.render("createProd", {
                pageTitle: "Crea tu producto",
                errors: resultValidation.mapped(),
                oldData: req.body,
                columnNamesBorder: productService
                    .tableNames(db.ProductBorderColor)
                    .filter((columnName) => {
                        return columnName != "id";
                    }),
                columnNamesGlass: productService
                    .tableNames(db.ProductGlassColor)
                    .filter((columnName) => {
                        return columnName != "id";
                    }),
            });
        }
        let gender = req.body.gender;
        console.log(req.body);
        await productService.createOne(req.body, req.files);
        res.redirect(`/collections?gender=${gender}`);
    },

    edit: async function (req, res) {
        const id = req.params.id;
        const product = await productService.findOne(id);
        res.render("editProd", {
            product,
            pageTitle: "Editando: " + product.name,
            columnNamesBorder: productService
                .tableNames(db.ProductBorderColor)
                .filter((columnName) => {
                    return columnName != "id";
                }),
            columnNamesGlass: productService
                .tableNames(db.ProductGlassColor)
                .filter((columnName) => {
                    return columnName != "id";
                }),
        });
    },

    update: async (req, res, files) => {
        const id = req.params.id;
        const resultValidation = validationResult(req);
        console.log(resultValidation);
        if (resultValidation.errors.length > 0) {
            const product = await productService.findOne(id);
            return res.render("editProd", {
                pageTitle: "Editando: " + product.name,
                errors: resultValidation.mapped(),
                product: product,
                oldData: req.body,
                columnNamesBorder: productService
                    .tableNames(db.ProductBorderColor)
                    .filter((columnName) => {
                        return columnName != "id";
                    }),
                columnNamesGlass: productService
                    .tableNames(db.ProductGlassColor)
                    .filter((columnName) => {
                        return columnName != "id";
                    }),
            });
        }

        await productService.updateOne(id, req.body, req.files);

        res.redirect(`/collections/${id}`);
    },

    destroy: async function (req, res) {
        const id = req.params.id;
        const product = await productService.findOne(id);
        productService.deleteOne(
            id,
            product.image_id,
            product.borderColor_Id,
            product.glassColor_Id
        );
        res.redirect("/");
    },
};

module.exports = controller;
