const dbPool = require("../db");



async function getProductByOwnerId(shop_owner_id) {
    const [rows] = await dbPool.query(`SELECT * 
                                         FROM products
                                         WHERE shop_owner_id = "${shop_owner_id}" AND del=0`);
    return [rows];
}
async function createProduct(name, shop_owner_id, productline_id, description) {
    await dbPool.query(`INSERT INTO products(name, shop_owner_id, productline_id, description)
                            VALUES("${name}", "${shop_owner_id}", "${productline_id}", "${description}")`);
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

async function getProductDetailByProductId(product_id) {
    const [rows] = await dbPool.query(`SELECT * FROM productdetails WHERE product_id = ${product_id} AND del=0`);
    return [rows];
}

async function getProductDetailByProductDetailId(id) {
    const [rows] = await dbPool.query(`SELECT * FROM productdetails WHERE id = ${id} AND del=0`);
    return [rows];
}

async function createProductDetail(product_id, imgUrl, classification, stock, price, saleprice) {
    await dbPool.query(`INSERT INTO productdetails(product_id, imgUrl, classification, stock, price, saleprice)
                            VALUES("${product_id}", "${imgUrl}", "${classification}", "${stock}", "${price}", "${saleprice}")`);
}

async function getProductbyId(product_id) {
    const [rows] = await dbPool.query(`SELECT * FROM products WHERE id = ${product_id} AND del=0`);
    return [rows];
}
async function delProductDetail(id) {
    await dbPool.query(`UPDATE productdetails SET del=1 WHERE id = ${id}`);
}
async function delProduct(id) {
    await dbPool.query(`UPDATE products SET del=1 WHERE id = ${id}`);
}

async function getProductNew() {
    const [rows] = await dbPool.query(`SELECT * FROM products ORDER BY id DESC LIMIT 30`);
    return [rows];
}

module.exports = {
    getProductByOwnerId,
    getProductlines,
    createProduct,
    update,
    getProductDetailByProductId,
    createProductDetail,
    getProductbyId,
    delProduct,
    delProductDetail,
    getProductDetailByProductDetailId,
    getProductNew


}