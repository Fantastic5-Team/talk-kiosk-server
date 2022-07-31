const jwtMiddleware = require("../../../config/jwtMiddleware");
const orderedProvider = require("../Ordered/oederedProvider");
const orderedService = require("../Ordered/orderedService");
const { response, errResponse } = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
//const {emit} = require("nodemon");


/*
1. 입력받은 status에 해당하는 ordered json 반환
*/
exports.getOrderedJson = async function (req, res) {
    let status = req.query.status; //query에서 status를 받아온다.
    
    if (!status) status = "PENDING"; //default는 PENDING
    status = status.toUpperCase(); //대문자 변환

    const jsonInfo = await orderedProvider.retrieveJsonInfo(status);
    
    return res.send(response(baseResponse.SUCCESS, {
        jsonInfo: jsonInfo  
    }));
}

/*
2. 입력받은 json으로 새로운 주문 row 생성
*/
exports.postOrdered = async function (req, res) {

    //Body : ordered 객체 
    const {data} = req.body;

    // 빈 값 체크
    if (!data)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
    
    const orderedResponse = await orderedService.createOrdered(
        data
    );

    return res.send(orderedResponse);
}

/*
3. 주문 status 변환 (COMPLETE or DELETE)
*/
exports.orderComplete = async function (req, res) {
    
    //바꾸려는 status 상태 (COMPLETE or DELETE)
    let editStatus = req.query.editStatus;

    editStatus = editStatus.toUpperCase();

    const orderedIdx = req.params.orderedIdx;
    
    if (!orderedIdx) {
        return res.send(errResponse(baseResponse.POST_POSITDX_EMPTY));
    }
    
    if(!editStatus) {
        return res.send(errResponse(baseResponse.POST_POSITDX_EMPTY));
    }

    if(orderedIdx <= 0) {
        return res.send(errResponse(baseResponse.POST_POSITDX_LENGTH));
    } 

    const editOrderCompleteResponse = await orderedService.editOrderComplete(orderedIdx, editStatus);

    return res.send(editOrderCompleteResponse);
};

