const dbPool = require("../db");


async function getShopByName(name) {
    const [rows] = await dbPool.query(`SELECT * 
                                         FROM shops
                                         WHERE name = "${name}"`);
    return [rows];
}
async function getShopById(id) {
    const [rows] = await dbPool.query(`SELECT * 
                                         FROM shops
                                         WHERE id = "${id}"`);
    return [rows];
}
async function getShopByUserId(id) {
    const [rows] = await dbPool.query(`SELECT * 
                                         FROM shops
                                         WHERE user_id = "${id}"`);
    return [rows];
}
async function createShop(name, user_id) {
    await dbPool.query(`INSERT INTO shops(name, user_id)
                            VALUES("${name}", "${user_id}")`);
}
module.exports = {
    getShopById,
    getShopByName,
    getShopByUserId,
    createShop
}