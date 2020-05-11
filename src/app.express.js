const express = require("express")
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const accountRoute = require("./routes/accounts.routes")

const appExpress = express();

appExpress.use(cors());
appExpress.use(bodyParser.json());
appExpress.use(bodyParser.urlencoded({extended: false}));
appExpress.use(morgan("combined"));

appExpress.use(express.static('./dist'));
appExpress.use("/accounts/",accountRoute);

appExpress.use("/", (req, res) => {
    res.sendFile('index.html');
});

module.exports = appExpress;
