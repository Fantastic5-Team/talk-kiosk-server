async function selectJsonInfo(connection, status) {
    const selectJsonInfoQuery = `
    SELECT ordered, orderedIdx
    FROM Ordered
    WHERE status = ?;
    `

    const [selectJsonInfo] = await connection.query(selectJsonInfoQuery, status);

    return selectJsonInfo;

}

// Ordered 테이블에 주문 추가
async function insertOrderInfo(connection, orderJson) {
    const ordereJsonString = JSON.stringify(orderJson); //json string으로 변경

    //ordered에 json을 string으로 insert, status는 PENDING로 insert
    const insertOrderInfoQuery = `
          insert into Ordered (ordered, status)
          values (?, 'PENDING');
      `
      
    const insertOrderInfoTable = await connection.query(
        insertOrderInfoQuery,
        ordereJsonString
    );
  
    return insertOrderInfoTable;
  }

module.exports = {
    selectJsonInfo,
    insertOrderInfo
};
