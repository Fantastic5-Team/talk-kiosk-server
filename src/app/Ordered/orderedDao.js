/*
//1. status가 PENDING인 ordered json 반환
*/
async function selectJsonInfo(connection) {
    //status가 PENDING인 ordered 반환
    const selectJsonInfoQuery = `
    SELECT ordered
    FROM Ordered
    WHERE status = 'PENDING';
    `

    const [selectJsonInfo] = await connection.query(selectJsonInfoQuery);

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

  /*
  3. order complete 처리
  */
  async function updateOrderComplete(connection, orderedIdx) {
    const updateOrderQuery = `
        UPDATE Ordered
        SET status = "COMPLETE"
        WHERE orderedIdx = ?;
    `

    const updateOrderRow = await connection.query(updateOrderQuery, orderedIdx);

    return updateOrderRow;
  }

module.exports = {
    selectJsonInfo,
    insertOrderInfo,
    updateOrderComplete
};
