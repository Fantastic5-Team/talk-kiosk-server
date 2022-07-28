async function selectJsonInfo(connection) {
    const selectJsonInfoQuery = `
    SELECT ordered
    FROM Ordered
    WHERE status = 'PENDING';
    `

    const [selectJsonInfo] = await connection.query(selectJsonInfoQuery);

    return selectJsonInfo;

}

// Ordered 테이블에 주문 추가
async function insertOrderInfo(connection, data) {
    const ordered = JSON.stringify(data);

    const insertOrderInfoQuery = `
          insert into Ordered (ordered, status)
          values (?, 'PENDING');
      `
    const insertOrderInfoTable = await connection.query(
        insertOrderInfoQuery,
        ordered
    );
  
    return insertOrderInfoTable;
  }

module.exports = {
    selectJsonInfo,
    insertOrderInfo
};
