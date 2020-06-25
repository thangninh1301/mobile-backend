const dbPool = require("../db");

async function create_order(ordercode,user_id,time) {
    await dbPool.query(`INSERT INTO orders(ordercode,status_id,user_id,time)
                            VALUES("${ordercode}", 5, "${user_id}", "${time}")`);
}

async function create_orderdetail(order_id,product_detail_id,quantity,orderprice) {
    await dbPool.query(`INSERT INTO orderdetail(order_id,product_detail_id,quantity,orderprice)
                            VALUES("${order_id}", "${product_detail_id}", "${quantity}", "${orderprice}")`);
}

async function getorders(user_id) {
    const [rows] = await dbPool.query(` SELECT * 
                                        FROM orders
                                        WHERE user_id = "${user_id}"
                                        ORDER BY orders.id DESC    `);
    return [rows];
}
async function getordersbycode(ordercode) {
    const [rows] = await dbPool.query(` SELECT * 
                                        FROM orders
                                        WHERE ordercode = "${ordercode}"`);
    return [rows];
}
async function updateOrderStatus(id, new_status) {
    await dbPool.query(`UPDATE orders
                            SET status = "${new_status}"
                            WHERE id = ${id}`);
}
module.exports = {
    create_order,
    create_orderdetail,
    getorders,
    updateOrderStatus,
    getordersbycode
}