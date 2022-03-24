const fs = require("fs");
const path = require("path");
const db = require("../database/models/");
const { Op } = require("sequelize");

const { validationResult } = require("express-validator");
const userService = require("../services/users");
const productService = require("../services/products");
const bcryptjs = require("bcryptjs");
const { query } = require("express");
const controller = {
    home: async function (req, res) {
        res.render("index", {
            products: await productService.getAll(),
            users: await userService.getAll(),
        });
    },
    login: function (req, res) {
        res.render("login", {
            pageTitle: "Ingresa",
        });
    },
    loginProcess: async function (req, res) {
        let userToLogin = await userService.findByField(req.body.email);
        console.log(userToLogin);
        if (userToLogin) {
            let passwordOk = bcryptjs.compareSync(
                req.body.password,
                userToLogin.password
            );
            if (passwordOk) {
                req.session.userLogged = userToLogin;
                if (req.body.remember) {
                    res.cookie("userEmail", req.body.email, {
                        maxAge: 1000 * 60 * 2,
                    });
                }

                return res.redirect("/profile/");
            }
            return res.render("login", {
                pageTitle: "Ingresa",
                errors: {
                    email: {
                        msg: "Las credenciales son incorrectas",
                    },
                },
            });
        }

        return res.render("login", {
            pageTitle: "Ingresa",
            errors: {
                email: {
                    msg: "Este email no está registrado",
                },
            },
        });
    },
    profile: function (req, res) {
        res.render("profile", {
            pageTitle: "Bienvenido",
            user: req.session.userLogged,
        });
    },
    register: function (req, res) {
        res.render("register", {
            pageTitle: "Crea tu cuenta",
        });
    },

    cart: async function (req, res) {
        let user = req.session.userLogged
        
        let transactions = await db.Transactions.findAll({
            where: {user_id: user.id},
            include: [
                {
                    association: "users",
                },
                {
                    association: "products",
                    include: [{
                        association: "imageProducts"
                    }]
                },
            ],
        });
        res.render("cart", {
            pageTitle: "Carrito",
            transactions: transactions,
        });
    },

    search: async function (req, res) {
        const search = await db.Products.findAll({
            where: {
                name: { [Op.like]: "%" + req.query.search + "%" },
            },
            include: [
                {
                    association: "imageProducts",
                },
            ],
        });

        return res.render("results", { search: search });
    },

    cRegister: async function (req, res) {
        const resultValidation = validationResult(req);
        console.log(resultValidation);
        if (resultValidation.errors.length > 0) {
            return res.render("register", {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }

        let userInD = await userService.findByField(req.body.email);

        if (userInD) {
            return res.render("register", {
                errors: {
                    email: {
                        msg: "Este email ya está registrado",
                    },
                },
                oldData: req.body,
            });
        }
        console.log(req.file);
        await userService.createUser(req.body, req.file);
        return res.render("thanksForR");
    },
    logout: (req, res) => {
        res.clearCookie("userEmail");
        req.session.destroy();
        return res.redirect("/");
    },
};

module.exports = controller;
