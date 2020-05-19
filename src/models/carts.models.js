const dbPool = require("../db");

async function create(user_id, product_id, quality) {
    await dbPool.query(`INSERT INTO cart(user_id, product_id, quality)
                            VALUES("${user_id}", "${product_id}", "${quality}")`);
}
async function update(id ,user_id, product_id, quality) {
    await dbPool.query(`UPDATE cart
                        SET user_id="${user_id}",
                            product_id="${product_id}",
                            quality="${quality}"
                        WHERE id = ${id}`);
}
async function del(id) {
    await dbPool.query(`DELETE FROM cart
                        WHERE id = ${id}`);
}
async function getCartExist(user_id,product_id) {
    const [rows] = await dbPool.query(`SELECT * 
                                         FROM cart
                                         WHERE user_id = "${user_id}"
                                               AND product_id =${product_id}`);
    return [rows];
}
async function getCarts(user_id) {
    const [rows] = await dbPool.query(`SELECT * 
                                         FROM cart
                                         WHERE user_id = "${user_id}"
                                               `);
    return [rows];
}
module.exports = {

    del,
    create,
    update,
    getCartExist,
    getCarts
}