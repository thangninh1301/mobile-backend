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
async function updateOrderStatusByOrderid_shop(id) {
    await dbPool.query(`UPDATE orders
                            SET status_id = 2
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
                                        WHERE OD.order_id = "${order_id}"`);
    return [rows];
}

async function getordersbyshopid(shop_id) {
    const [rows] = await dbPool.query(` SELECT O.*,OS.status,S.waybill_code
                                        FROM orders as O 
                                        INNER JOIN orderstatus AS OS 
                                        ON O.status_id = OS.id
                                        INNER JOIN shipment as S
                                        on S.order_id=O.id
                                        INNER JOIN orderdetail as OD 
                                        on O.id = OD.order_id
                                        INNER JOIN productdetails as PD
                                        ON OD.product_detail_id = PD.id
                                        INNER JOIN products as P
                                        ON PD.product_id = P.id
                                        WHERE P.shop_owner_id = "${shop_id}"`);
    return [rows];
}
async function getordersbyshopidandOrderid(shop_id,order_id) {
    const [rows] = await dbPool.query(` SELECT O.*,OS.status,S.waybill_code
                                        FROM orders as O 
                                        INNER JOIN orderstatus AS OS 
                                        ON O.status_id = OS.id
                                        INNER JOIN shipment as S
                                        on S.order_id=O.id
                                        INNER JOIN orderdetail as OD 
                                        on O.id = OD.order_id
                                        INNER JOIN productdetails as PD
                                        ON OD.product_detail_id = PD.id
                                        INNER JOIN products as P
                                        ON PD.product_id = P.id
                                        WHERE P.shop_owner_id = "${shop_id}"
                                                and O.id="${order_id}"`);
    return [rows];
}
async function updateShipment(order_id, waybill_code) {
    await dbPool.query(`UPDATE shipment
                            SET waybill_code = "${waybill_code}"   
                            WHERE order_id = ${order_id}`);
}
module.exports = {
    create_order,
    create_orderdetail,
    getorders,
    updateOrderStatusByOrderid_shop,
    getordersbycode,
    updateOrder,
    getordersbyid,
    getordersbyuserid,
    getorderdetailbyorderid,
    getordersbyshopid,
    getordersbyshopidandOrderid,
    updateShipment
}
