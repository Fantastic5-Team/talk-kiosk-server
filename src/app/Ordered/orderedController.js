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

exports.getOrderedJson = async function (req, res) {
    let status = req.query.status;
    
    if (!status) status = "PENDING";
    status = status.toUpperCase();

    const jsonInfo = await orderedProvider.retrieveJsonInfo(status);
    
    return res.send(response(baseResponse.SUCCESS, {
        jsonInfo: jsonInfo
    }));
}

//ordered json을 Ordered에 insert
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