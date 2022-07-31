const jwtMiddleware = require("../../../config/jwtMiddleware");
const orderedProvider = require("./orderedProvider");
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

  return res.send(
    response(baseResponse.SUCCESS, {
      jsonInfo: jsonInfo,
    })
  );
};

/*
    2. 입력받은 json으로 새로운 주문 row 생성
*/
exports.postOrdered = async function (req, res) {
  const { data } = req.body; //Body: data 객체

  // 빈 값 체크
  if (!data) return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

  const orderedResponse = await orderedService.createOrdered(data);

  return res.send(orderedResponse);
};

/*
    3. 주문 status 변환 (COMPLETE or DELETED / 예외는 PENDING)
*/
exports.orderComplete = async function (req, res) {
  const orderedIdx = req.params.orderedIdx;
  let editStatus = req.query.status; //바꾸려는 status 상태 (COMPLETE or DELETE)

  if (!editStatus) editStatus = "PENDING"; //default는 PENDING
  editStatus = editStatus.toUpperCase();

  if (!orderedIdx)
    return res.send(errResponse(baseResponse.POST_POSITDX_EMPTY));

  if (!editStatus)
    return res.send(errResponse(baseResponse.POST_POSITDX_EMPTY));

  if (orderedIdx <= 0)
    return res.send(errResponse(baseResponse.POST_POSITDX_LENGTH));

  const editOrderCompleteResponse = await orderedService.editOrderComplete(
    orderedIdx,
    editStatus
  );

  return res.send(editOrderCompleteResponse);
};
