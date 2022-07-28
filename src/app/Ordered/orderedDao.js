async function selectJsonInfo(connection, orderedIdx) {
    const selectJsonInfoQuery = `
    SELECT ordered
    FROM Ordered
    WHERE status = 'PENDING';
    `

    const [selectJsonInfo] = await connection.query(selectJsonInfoQuery, orderedIdx);

    return selectJsonInfo[0];

}



