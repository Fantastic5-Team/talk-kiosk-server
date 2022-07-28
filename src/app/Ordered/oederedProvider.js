const { pool } = require("../../../config/database");
const orderedDao = require("./orderedDao");

exports.retrieveJsonInfo = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const jsonInfoResult = await orderedDao.selectJsonInfo(connection);
  
    connection.release();
  
    return jsonInfoResult;
  };
  