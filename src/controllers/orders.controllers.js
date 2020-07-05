const jwt = require("jsonwebtoken");

const ordersModels = require("../models/orders.models");
const responseUtil = require("../utils/response.utils");
const randomize = require('randomatic');
const moment =require('moment');
const modelsCart = require("../models/carts.models");
async function create(req, res) {
    const {
        data
    } = req.body;
    const {id}=req.tokenData;
    try {
        const {cart_id} = data;

        const ordercode=randomize('A0',9);
        await ordersModels.create_order(ordercode, id, moment().format("x"));

        let [rows]= await ordersModels.getordersbycode(ordercode);
        rows=rows[0];

        for(let i = 0; i < cart_id.length; i++){
            let [temp]= await  modelsCart.getCartById(cart_id[i]);
            temp=temp[0];

            if (temp.user_id===id)
            {
                await ordersModels.create_orderdetail(rows.id,temp.productdetail_id,temp.quality,temp.saleprice);
                await modelsCart.del(temp.id);
            }


        }

        res.json(responseUtil.success({data: {order_id:rows.id}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function update(req, res) {
    const {
        order_id,
        fullname,
        address,
        phone
    } = req.body;
    const {id}=req.tokenData;
    try {
        if (!order_id)
            throw new Error("missig");
        if (!fullname)
            throw new Error("missig");
        if (!address)
            throw new Error("missig");
        if (!phone)
            throw new Error("missig");
        const [existedOrder] = await ordersModels.getordersbyid(order_id);
        if (!existedOrder.length){
            throw new Error("not exist");
        }
        await ordersModels.updateOrder(order_id,fullname,phone,address);


        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getAllOrdersbyUser(req, res) {
    const {id}=req.tokenData;
    try {
        let [rows] = await ordersModels.getordersbyuserid(id)
        for (let i = 0; i < rows.length; i++){
            let [OD] = await ordersModels.getorderdetailbyorderid(rows[i].id)
            if( OD.length) {
                rows[i].imgUrl= OD[0].imgUrl;
                let totalprice=0
                for (let j = 0; j < OD.length; j++){
                    totalprice=totalprice + OD[j].orderprice* OD[j].quantity;

                }
                rows[i].totalprice= totalprice;
            }

        }
        res.json(responseUtil.success({data: {rows}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}
async function getOrderDetailbyOrderid(req, res) {
    const {
        order_id
    } = req.query;
    try {
        const [rows] = await ordersModels.getorderdetailbyorderid(order_id)

        res.json(responseUtil.success({data: {rows}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getAllOrdersbymyShop(req, res) {
    const {id}=req.tokenData;
    try {
        let [rows] = await ordersModels.getordersbyshopid(id);
        for (let i = 0; i < rows.length; i++){
            let [OD] = await ordersModels.getorderdetailbyorderid(rows[i].id)
            if( OD.length) {
                rows[i].imgUrl= OD[0].imgUrl;
                let totalprice=0
                for (let j = 0; j < OD.length; j++){
                    totalprice=totalprice + OD[j].orderprice* OD[j].quantity;

                }
                rows[i].totalprice= totalprice;
            }

        }
        res.json(responseUtil.success({data: {rows}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}
async function updateStatusbyshop(req, res) {
    const {id}=req.tokenData;
    const {
        order_id,
        waybill
    } = req.body;
    try {
        if (!order_id)
            throw new Error("missig");

        const [existed] = await ordersModels.getordersbyid(order_id);

        if (!existed.length)
            throw new Error("orders not exist");

        const [exited2] = await ordersModels.getordersbyshopidandOrderid(id,order_id);
        if (!exited2.length)
            throw new Error("you dont have permission, you aren't shop owner");


        await ordersModels.updateOrderStatusByOrderid_shop(order_id)
        await ordersModels.updateShipment(order_id,waybill)
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}
module.exports = {
    create,
    update,
    getAllOrdersbyUser,
    getOrderDetailbyOrderid,
    getAllOrdersbymyShop,
    updateStatusbyshop
}