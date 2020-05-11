const dbPool = require("../db");



async function getProductByUserId(id) {
    const [rows] = await dbPool.query(`SELECT * 
                                         FROM products
                                         WHERE user_id = "${id}"`);
    return [rows];
}
async function createProduct(name, shop_owner_id, productline_id, description) {
    await dbPool.query(`INSERT INTO products(name, shop_owner_id, productline_id, description)
                            VALUES("${name}", "${shop_owner_id}"), "${productline_id}"), "${description}")`);
}

async function update(id, new_description, new_name) {
    await dbPool.query(`UPDATE products
                            SET name = "${new_name}",
                            SET description = "${new_description}"
                            WHERE id = ${id}`);
}

async function getProductlines() {
    const [rows] = await dbPool.query(`SELECT * FROM product_lines`);
    return [rows];
}
module.exports = {
    getProductByUserId,
    getProductlines,
    createProduct,
    update
}