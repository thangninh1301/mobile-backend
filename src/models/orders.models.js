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
async function updateOrder(id, fullname, phone, address) {
    await dbPool.query(`UPDATE orders
                            SET fullname = "${fullname}",
                                phone = "${phone}",
                                address = "${address}"
                            WHERE id = ${id}`);
}
async function getordersbyid(id) {
    const [rows] = await dbPool.query(` SELECT * 
                                        FROM orders
                                        WHERE id = "${id}"`);
    return [rows];
}

async function getordersbyuserid(user_id) {
    const [rows] = await dbPool.query(` SELECT O.*,OS.status,S.waybill_code
                                        FROM orders as O 
                                        INNER JOIN orderstatus AS OS 
                                        ON O.status_id = OS.id
                                        INNER JOIN shipment as S
                                        on S.order_id=O.id
                                        WHERE user_id = "${user_id}"`);
    return [rows];
}

async function getorderdetailbyorderid(order_id) {
    const [rows] = await dbPool.query(` SELECT OD.*,PD.imgUrl,PD.classification
                                        FROM orderdetail as OD 
                                        INNER JOIN productdetails as PD
                                        ON OD.product_detail_id = PD.id
                                        WHERE order_id = "${order_id}"`);
    return [rows];
}

module.exports = {
    create_order,
    create_orderdetail,
    getorders,
    updateOrderStatus,
    getordersbycode,
    updateOrder,
    getordersbyid,
    getordersbyuserid,
    getorderdetailbyorderid
}
