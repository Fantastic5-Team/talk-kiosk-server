const { pool } = require("../../../config/database");
const orderedDao = require("./orderedDao");

exports.retrieveJsonInfo = async function (orederedIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const jsonInfoResult = await orderedDao.selectJsonInfo(connection, orederedIdx);
  
    connection.release();
  
    return jsonInfoResult;
    console.log(jsonInfoResult);
  };
  