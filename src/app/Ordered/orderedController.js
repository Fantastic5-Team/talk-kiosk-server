const jwtMiddleware = require("../../../config/jwtMiddleware");
const orderedProvider = require("../Ordered/oederedProvider");
const orderedService = require("../Ordered/orderedService");
const { response, errResponse } = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const {emit} = require("nodemon");

/*
//기존 파일 끝
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const { response, errResponse } = require("../../../config/response");
const postProvider = require("../Post/postProvider");
*/
//const regexEmail = require("regex-email");
//const {emit} = require("nodemon");

/*
1. status가 PENDING인 ordered json 반환
*/
exports.getOrderedJson = async function (req, res) {

    const jsonInfo = await orderedProvider.retrieveJsonInfo();
    
    return res.send(response(baseResponse.SUCCESS, {
        jsonInfo: jsonInfo
    }));
}

/*
2. 새로운 주문 row 생성
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
3. order complete 처리
*/
exports.orderComplete = async function (req, res) {

    const orderedIdx = req.params.orderedIdx;
    
    if (!orderedIdx) {
        return res.send(errResponse(baseResponse.POST_POSITDX_EMPTY));
    } 

    if(orderedIdx <= 0) {
        return res.send(errResponse(baseResponse.POST_POSITDX_LENGTH));
    } 

    const editOrderCompleteResponse = await orderedService.editOrderComplete(orderedIdx);

    return res.send(editOrderCompleteResponse);
};

