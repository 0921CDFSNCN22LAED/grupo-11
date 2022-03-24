const db = require("../database/models");

module.exports = {
    cart: async (product_id) => {
        let product = await db.Products.findByPk(product_id);
        let order = {
            product_id: product.id,
            amount: 1,
            price: product.price,
            total_price: product.price,
        };
        if (this.isInCart(product) == true) {
            console.log(sessionStorage);
        } else {
            if (sessionStorage.length == 0) {
                sessionStorage.setItem(1, order);
            } else {
                let key = sessionStorage.length
                sessionStorage.setItem(key, order)
            }
        }
    },
    isInCart: (product) => {
        let storage = this.storage();
        for (order in storage) {
            if (order.product_id == product_id) {
                let newAmount = order.amount + 1;
                let newTotalPrice = newAmount * product.price;
                let newOrder = {
                    product_id: product.id,
                    price: product.price,
                    amount: newAmount,
                    price: product.price,
                    total_price: newTotalPrice,
                };
                sessionStorage.setItem(order, newOrder);
                return true;
            }
        }
    },
    storage: () => {
        let storage = {};
        Object.keys(sessionStorage).forEach((key) => {
            storage[key] = sessionStorage.getItem(key);
        });
        return storage;
    },
};
