const { pool } = require("../../../config/database");
const orderedDao = require("./orderedDao");

/*
1. 1. status가 PENDING인 ordered json 반환
*/
exports.retrieveJsonInfo = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const jsonInfoResult = await orderedDao.selectJsonInfo(connection);
  
    connection.release();
  
    return jsonInfoResult;
};
