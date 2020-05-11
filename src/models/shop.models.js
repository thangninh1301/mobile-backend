const dbPool = require("../db");


async function getShopByName(name) {
    const [rows] = await dbPool.query(`SELECT * 
                                         FROM shops
                                         WHERE name = "${name}"`);
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

async function update(new_name, new_description) {
    await dbPool.query(`UPDATE shops
                            SET name = "${new_name}",
                            SET description = "${new_description}"
                            WHERE id = ${id}`);
}
module.exports = {
    getShopByName,
    getShopByUserId,
    createShop,
    update
}