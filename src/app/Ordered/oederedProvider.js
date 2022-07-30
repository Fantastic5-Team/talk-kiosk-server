const { pool } = require("../../../config/database");
const orderedDao = require("./orderedDao");

exports.retrieveJsonInfo = async function (status) {
    const connection = await pool.getConnection(async (conn) => conn);
    const jsonInfoResult = await orderedDao.selectJsonInfo(connection, status);
  
    connection.release();
  
    return jsonInfoResult;
};