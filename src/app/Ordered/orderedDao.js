async function selectJsonInfo(connection) {
    const selectJsonInfoQuery = `
    SELECT ordered
    FROM Ordered
    WHERE status = 'PENDING';
    `

    const [selectJsonInfo] = await connection.query(selectJsonInfoQuery);

    return selectJsonInfo;

}

module.exports = {
    selectJsonInfo
  };