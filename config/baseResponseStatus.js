module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    //Request error
    ORDERED_INPUT_ERROR: { "isSuccess": false, "code": 2001, "message": "status 값이 잘못 되었습니다." },
    ORDERED_NEWROW_ERROR: { "isSuccess": false, "code": 2002, "message": "data의 형식이 잘못 되었습니다. order 존재 X" },
    ORDERED_CHANGESTATUS_NOSTATUS: { "isSuccess": false, "code": 2003, "message": "status를 입력해주세요." },
    ORDERED_CHANGESTATUS_ERRORSTATUS: { "isSuccess": false, "code": 2004, "message": "일치하는 status가 없습니다." },
    ORDERED_CHANGESTATUS_NOORDERIDX: { "isSuccess": false, "code": 2005, "message": "orderedIdx를 입력해주세요." },
    ORDERED_CHANGESTATUS_NEGATIVEIDX: { "isSuccess": false, "code": 2006, "message": "양수 orderedIdx을 입력해주세요." },
    ORDERED_CHANGESTATUS_NOORDEREDIDX: { "isSuccess": false, "code": 2007, "message": "일치하는 orderedIdx가 없습니다." },
    
    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
 
 
}
