const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const orderedDao = require("./orderedDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

//const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");


/*
2. 새로운 주문 row 생성
*/
exports.createOrdered = async function (orderJson) {
    try {

        const connection = await pool.getConnection(async (conn) => conn);

        const orderNumberResult = await orderedDao.insertOrderInfo(connection, orderJson);
        
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createOrdered Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    } 
};

/*
3. order complete 처리
*/
exports.editOrderComplete = async function (orderedIdx) {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
        const editorderCompleteResult = await orderedDao.updateOrderComplete(connection, orderedIdx);
        return response(baseResponse.SUCCESS);
    } catch (err) {
        console.log(`App - editOrder Service erro/: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
}
