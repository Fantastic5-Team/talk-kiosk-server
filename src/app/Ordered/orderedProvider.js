const { pool } = require("../../../config/database");
const orderedDao = require("./orderedDao");

/*
    1. 입력받은 status에 해당하는 ordered json 반환
*/
exports.retrieveJsonInfo = async function (status) {
  const connection = await pool.getConnection(async (conn) => conn);
  const jsonInfoResult = await orderedDao.selectJsonInfo(connection, status);

  connection.release();

  return jsonInfoResult;
};

exports.checkOrderedStatus = async function (orderedIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const orderedStatusResult = await orderedDao.checkOrderedStatus(connection, orderedIdx);
  console.log(orderedStatusResult[0].t);
  connection.release();

  return orderedStatusResult[0].t;
}
