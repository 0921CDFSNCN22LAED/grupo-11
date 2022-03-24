module.exports = function (sequelize, dataTypes) {
    let alias = "Products";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: { type: dataTypes.STRING },
        price: { type: dataTypes.DECIMAL },
        description: { type: dataTypes.TEXT },
        type: { type: dataTypes.STRING },
        borderColor_Id: { type: dataTypes.INTEGER },
        glassColor_Id: { type: dataTypes.INTEGER },
        brand: { type: dataTypes.STRING },
        gender: { type: dataTypes.STRING },
        model: { type: dataTypes.STRING },
        image_id: { type: dataTypes.INTEGER },
    };
    let config = {
        tableName: "products",
        timestamps: false,
    };
    let Products = sequelize.define(alias, cols, config);

    Products.associate = function (models) {
        Products.belongsTo(models.ImageProducts, {
            as: "imageProducts",
            foreignKey: "image_id",
        });
        Products.belongsTo(models.ProductBorderColor, {
            as: "ProductBorderColor",
            foreignKey: "borderColor_Id",
        });
        Products.belongsTo(models.ProductGlassColor, {
            as: "ProductGlassColor",
            foreignKey: "glassColor_Id",
        });
        Products.hasMany(models.Transactions,{
            as:"products",
            foreignKey: "id"
        })
        //        Products.belongsToMany(models.Users, {
        //           as: "users",
        //          through: "user_shop",
        //          foreignKey: "product_id",
        //           otherKey: "user_id",
        //          timestamps: false,
        //      });
    };
    return Products;
};
