const dbPool = require("../db");

async function create_order(fullname,email,phone,address,note,status,user_id) {
    await dbPool.query(`INSERT INTO orders(fullname,email,phone,address,note,status,user_id)
                            VALUES("${fullname}", "${email}", "${phone}"), "${address}"), "${note}"), "${status}"), "${user_id}")`);
}

async function create_orderdetail(order_id,product_id,quantity,orderprice) {
    await dbPool.query(`INSERT INTO orders(order_id,product_id,quantity,orderprice)
                            VALUES("${order_id}", "${product_id}", "${quantity}"), "${orderprice}")`);
}

async function getorders(user_id) {
    const [rows] = await dbPool.query(` SELECT * 
                                        FROM orders
                                        WHERE user_id = "${user_id}"
                                        ORDER BY orders.id DESC    `);
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
    updateOrderStatus
}
