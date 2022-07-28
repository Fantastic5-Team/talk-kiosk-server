const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const userDao = require("./orderedDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

//const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

exports.createOrdered = async function (orderJson) {
    try {

        const connection = await pool.getConnection(async (conn) => conn);

        const orderNumberResult = await userDao.insertOrderInfo(connection, orderJson);
        
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createOrdered Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    } 
};