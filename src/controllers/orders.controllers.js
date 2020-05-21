const jwt = require("jsonwebtoken");

const ordersModels = require("../models/orders.models");
const responseUtil = require("../utils/response.utils");

async function create(req, res) {
    const {
        fullname,
        email,
        phone,
        address,
        note,
        status,
        user_id,
        data
    } = req.body;
    const {id}=req.tokenData;
    try {
        const {rows} = data;
        for(let i = 0; i < rows.length; i++){
            console.log(rows[i]);
        }

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

module.exports = {
 create
}