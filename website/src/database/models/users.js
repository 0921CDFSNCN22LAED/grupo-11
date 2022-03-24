module.exports = function (sequelize, dataTypes) {
    let alias = "Users";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: { type: dataTypes.STRING },
        email: { type: dataTypes.STRING },
        password: { type: dataTypes.STRING },
        repassword: { type: dataTypes.STRING },
        adress_id: { type: dataTypes.INTEGER },
        photo_user: { type: dataTypes.STRING },
        admin: { type: dataTypes.INTEGER },
    };
    let config = {
        tableName: "users",
        timestamps: false,
    };
    let Users = sequelize.define(alias, cols, config);

    Users.associate = function (models) {
        Users.belongsTo(models.Adress, {
            as: "adress",
            foreignKey: "adress_id",
        });
        Users.hasMany(models.Transactions, {
            as: "users",
            foreignKey: "id",
        });
    };
    return Users;
};
