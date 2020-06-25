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
            console.log(rows.id)
            if (temp.user_id===id)
            {
                await ordersModels.create_orderdetail(rows.id,temp.productdetail_id,temp.quality,temp.saleprice);
                await modelsCart.del(temp.id);
            }


        }

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

module.exports = {
 create
}