const express = require("express")
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const accountRoute = require("./routes/accounts.routes");
const shopRoute = require("./routes/shop.routes");
const productRoute = require("./routes/products.routes");

const appExpress = express();

appExpress.use(cors());
appExpress.use(bodyParser.json());
appExpress.use(bodyParser.urlencoded({extended: false}));
appExpress.use(morgan("combined"));

appExpress.use(express.static('./dist'));
appExpress.use("/accounts/",accountRoute);
appExpress.use("/products/",productRoute);
appExpress.use("/shops/",shopRoute);

appExpress.use("/", (req, res) => {
    res.send('mobile-backend');
});

module.exports = appExpress;
