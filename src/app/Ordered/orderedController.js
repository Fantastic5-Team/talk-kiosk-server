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
    /*
        Path Variable: 
    */
    /*const orderedIdx = req.params.orderedIdx; //orederedIdx를 받아온다.

    // validation 
    if(!orderedIdx) {
        //return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    } 
    if (orderedIdx <= 0) {
        //return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
    }*/

    const jsonInfo = await orderedProvider.retrieveJsonInfo();
    
    return res.send(response(baseResponse.SUCCESS, {
        jsonInfo: jsonInfo
    }));
}