const dbPool = require("../db");

async function create(user_id, product_id, quality) {
    await dbPool.query(`INSERT INTO cart(user_id, productdetail_id, quality)
                            VALUES("${user_id}", "${product_id}", "${quality}")`);
}
async function update(id ,user_id, product_id, quality) {
    await dbPool.query(`UPDATE cart
                        SET user_id="${user_id}",
                            productdetail_id="${product_id}",
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
                                        AND productdetail_id =${product_id}`);
    return [rows];
}
async function getCarts(user_id) {
    const [rows] = await dbPool.query(`SELECT C.id,C.productdetail_id,C.quality,PD.product_id,P.shop_owner_id
                                         FROM cart AS C INNER JOIN productdetails AS PD
                                         ON C.productdetail_id = PD.ID
                                         INNER JOIN products AS P
                                         ON PD.product_id = P.id
                                         WHERE C.user_id = ${user_id}`);
    return [rows];
}
module.exports = {
    del,
    create,
    update,
    getCartExist,
    getCarts
}