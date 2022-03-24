module.exports = function (sequelize, dataTypes) {
    let alias = "Transactions";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_id: { type: dataTypes.INTEGER },
        user_id: { type: dataTypes.INTEGER },
        amount: { type: dataTypes.INTEGER },
        border_color: {type: dataTypes.STRING},
        glass_color: {type: dataTypes.STRING}
    };
    let config = {
        tableName: "transactions",
        timestamps: false,
    };
    let Transactions = sequelize.define(alias, cols, config);

    Transactions.associate = function (models) {
        Transactions.belongsTo(models.Users, {
            as: "users",
            foreignKey: "user_id",
        });
        Transactions.belongsTo(models.Products, {
            as: "products",
            foreignKey: "product_id",
        });
    };
    return Transactions;
};
