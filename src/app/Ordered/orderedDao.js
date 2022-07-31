/*
//1. 입력받은 status에 해당하는 ordered json 반환
*/
async function selectJsonInfo(connection, status) {
    const selectJsonInfoQuery = `
    SELECT ordered, orderedIdx
    FROM Ordered
    WHERE status = ?;
    `

    const [selectJsonInfo] = await connection.query(selectJsonInfoQuery, status);

    return selectJsonInfo;

}


/*
2. 입력받은 json으로 새로운 주문 row 생성
*/
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
  async function updateOrderComplete(connection, orderedIdx, editStatus) {

    const editStatusParams = [editStatus, editStatus, orderedIdx]; //query ?에 순서대로 들어간다
    
    //editStatus에 해당하는 대로 status를 바꾼다. 이상한 문자열이 들어오면 PENDING로 그대로 둔다.
    const updateOrderQuery = `
        UPDATE Ordered
        SET status = case
                        when ? = 'COMPLETE' then 'COMPLETE'
                        when ? = 'DELETE' then 'DELETE'
                        else 'PENDING'
                    end
        WHERE orderedIdx = ?;
    `

    const updateOrderRow = await connection.query(updateOrderQuery, editStatusParams);

    return updateOrderRow;
  }

module.exports = {
    selectJsonInfo,
    insertOrderInfo,
    updateOrderComplete
};
