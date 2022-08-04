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

  status = status.toUpperCase(); //대문자 변환
  if (!status) status = "PENDING"; //default는 PENDING
  if (status !== "PENDING" && status !== "COMPLETE" && status !== "DELETED") {
    return res.send(errResponse(baseResponse.ORDERED_INPUT_ERROR));
  }

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
  const { data} = req.body; //Body: data 객체

  if (!data.order) return res.send(response(baseResponse.ORDERED_NEWROW_ERROR)); //order 번호가 없는 경우 주문 row 생성 취소
  if (!data) return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH)); //이게 정상적으로 실행이 안됨
  

  const orderedResponse = await orderedService.createOrdered(data);

  return res.send(orderedResponse);
};

/*
    3. 주문 status 변환 (COMPLETE or DELETED / 예외는 PENDING)
*/
exports.orderComplete = async function (req, res) {
  const orderedIdx = req.params.orderedIdx;
  let editStatus = req.query.status; //바꾸려는 status 상태 (COMPLETE or DELETE)

  //if (!editStatus) editStatus = "PENDING"; ///default는 PENDING 웅아 이거 default값을 설정할꺼야??????????
  if (!editStatus) {
    return res.send(errResponse(baseResponse.ORDERED_CHANGESTATUS_NOSTATUS));
  }
  else {
    editStatus = editStatus.toUpperCase()
  }//입력값이 있으면 전부대문자로 바꾸어준다.

  if (editStatus !== "PENDING" && editStatus !== "COMPLETE" && editStatus !== "DELETED") {
    return res.send(errResponse(baseResponse.ORDERED_CHANGESTATUS_ERRORSTATUS));
  } //Pending complete delted중에 값이 없는경우.

  console.log(orderedIdx);
  if (!orderedIdx) {
    console.log("값이 없는 경우");
    return res.send(errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL));
  }

  if (orderedIdx <= 0)
    return res.send(errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL));

  const editOrderCompleteResponse = await orderedService.editOrderComplete(
    orderedIdx,
    editStatus
  );

  return res.send(editOrderCompleteResponse);
};
