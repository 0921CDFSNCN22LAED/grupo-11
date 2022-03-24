const fs = require("fs");
const path = require("path");
const db = require("../database/models/");

module.exports = {
    getAll: async () => {
        return await db.Products.findAll({
            include: [
                {
                    association: "imageProducts",
                },
                {
                    association: "ProductBorderColor",
                },
                {
                    association: "ProductGlassColor",
                },
            ],
        });
    },

    getAllCollection: async (gender) => {
        return await db.Products.findAll({
            where: { gender: gender },
            include: [
                {
                    association: "imageProducts",
                },
                {
                    association: "ProductBorderColor",
                },
                {
                    association: "ProductGlassColor",
                },
            ],
        });
    },

    getProductBorderColor: async () => {
        return await db.ProductBorderColor.findAll({
            include: [{ association: "products" }],
        });
    },

    getProductGlassColor: async () => {
        return await db.ProductGlassColor.findAll({
            include: [{ association: "products" }],
        });
    },

    async createOne(body, files) {
        let imageProduct = await db.ImageProducts.create({
            ...(files[0] && {
                image1: "/images/productsimage/" + files[0].filename,
            }),
            ...(files[1] && {
                image2: "/images/productsimage/" + files[1].filename,
            }),
            ...(files[2] && {
                image3: "/images/productsimage/" + files[2].filename,
            }),
        });
        let borderColor = await db.ProductBorderColor.create({
            red: this.reqProductBorderColors(body.redBorder),
            blue: this.reqProductBorderColors(body.blueBorder),
            black: this.reqProductBorderColors(body.blackBorder),
            white: this.reqProductBorderColors(body.whiteBorder),
            purple: this.reqProductBorderColors(body.purpleBorder),
            grey: this.reqProductBorderColors(body.greyBorder),
            green: this.reqProductBorderColors(body.greenBorder),
            orange: this.reqProductBorderColors(body.orangeBorder),
            yellow: this.reqProductBorderColors(body.yellowBorder),
            pink: this.reqProductBorderColors(body.pinkBorder),
            brown: this.reqProductBorderColors(body.brownBorder),
            transparent: this.reqProductBorderColors(body.transparentBorder),
        });
        let glassColor = await db.ProductGlassColor.create({
            red: this.reqProductBorderColors(body.redGlass),
            blue: this.reqProductBorderColors(body.blueGlass),
            black: this.reqProductBorderColors(body.blackGlass),
            white: this.reqProductBorderColors(body.whiteGlass),
            purple: this.reqProductBorderColors(body.purpleGlass),
            grey: this.reqProductBorderColors(body.greyGlass),
            green: this.reqProductBorderColors(body.greenGlass),
            orange: this.reqProductBorderColors(body.orangeGlass),
            yellow: this.reqProductBorderColors(body.yellowGlass),
            pink: this.reqProductBorderColors(body.pinkGlass),
            brown: this.reqProductBorderColors(body.brownGlass),
        });
        await db.Products.create({
            name: body.name,
            price: body.price,
            description: body.description,
            type: body.type,
            borderColor_Id: borderColor.id,
            glassColor_Id: glassColor.id,
            brand: body.brand,
            gender: body.gender,
            model: body.model,
            image_id: imageProduct.id,
        });
    },

    async findOne(id) {
        return await db.Products.findByPk(id, {
            include: [
                {
                    association: "imageProducts",
                },
                {
                    association: "ProductBorderColor",
                },
                {
                    association: "ProductGlassColor",
                },
            ],
        });
    },

    async updateOne(id, body, files) {
        try {
            await db.ImageProducts.update(
                {
                    ...(files[0] && {
                        image1: "/images/productsimage/" + files[0].filename,
                    }),
                    ...(files[1] && {
                        image2: "/images/productsimage/" + files[1].filename,
                    }),
                    ...(files[2] && {
                        image3: "/images/productsimage/" + files[2].filename,
                    }),
                },
                {
                    where: { id: id },
                },
                {
                    multi: true,
                }
            );
            await db.Products.update(
                {
                    ...body,
                },
                {
                    where: { id: id },
                },
                {
                    multi: true,
                }
            );
            console.log(this.reqProductBorderColors(body.redBorder));
            await db.ProductBorderColor.update(
                {
                    red: this.reqProductBorderColors(body.redBorder),
                    blue: this.reqProductBorderColors(body.blueBorder),
                    black: this.reqProductBorderColors(body.blackBorder),
                    white: this.reqProductBorderColors(body.whiteBorder),
                    purple: this.reqProductBorderColors(body.purpleBorder),
                    grey: this.reqProductBorderColors(body.greyBorder),
                    green: this.reqProductBorderColors(body.greenBorder),
                    orange: this.reqProductBorderColors(body.orangeBorder),
                    yellow: this.reqProductBorderColors(body.yellowBorder),
                    pink: this.reqProductBorderColors(body.pinkBorder),
                    brown: this.reqProductBorderColors(body.brownBorder),
                    transparent: this.reqProductBorderColors(
                        body.transparentBorder
                    ),
                },
                {
                    where: { id: id },
                }
            );
            await db.ProductGlassColor.update(
                {
                    red: this.reqProductBorderColors(body.redGlass),
                    blue: this.reqProductBorderColors(body.blueGlass),
                    black: this.reqProductBorderColors(body.blackGlass),
                    white: this.reqProductBorderColors(body.whiteGlass),
                    purple: this.reqProductBorderColors(body.purpleGlass),
                    grey: this.reqProductBorderColors(body.greyGlass),
                    green: this.reqProductBorderColors(body.greenGlass),
                    orange: this.reqProductBorderColors(body.orangeGlass),
                    yellow: this.reqProductBorderColors(body.yellowGlass),
                    pink: this.reqProductBorderColors(body.pinkGlass),
                    brown: this.reqProductBorderColors(body.brownGlass),
                },
                {
                    where: { id: id },
                }
            );
        } catch (err) {
            console.log(err);
        }
    },

    async addToCart(body) {
        await db.Transactions.create({
            ...body
        });
    },

    async deleteOne(id, image, border, glass) {
        await db.ProductBorderColor.destroy({
            where: { id: border },
            force: true,
        });
        await db.ProductGlassColor.destroy({
            where: { id: glass },
            force: true,
        });
        await db.Products.destroy({ where: { id: id }, force: true });
        await db.ImageProducts.destroy({ where: { id: image }, force: true });
    },
    tableNames: (modelName) => {
        let keys = [];
        for (let key in modelName.rawAttributes) {
            keys.push(key);
        }
        return keys;
    },
    reqProductBorderColors: (name) => {
        if (name == null) {
            return 0;
        } else {
            return name;
        }
    },
};
