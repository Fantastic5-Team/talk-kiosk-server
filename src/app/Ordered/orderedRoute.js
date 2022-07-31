module.exports = function (app) {
  const ordered = require("./orderedController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");

  // 1. 입력받은 status에 해당하는 ordered json 반환
  app.get("/app/ordered", ordered.getOrderedJson);

  // 2. 입력받은 json으로 새로운 주문 row 생성
  app.post("/app/ordered", ordered.postOrdered);

  //3. 주문 status 변환 (COMPLETE or DELETED / 예외는 PENDING)
  app.patch("/app/ordered/:orderedIdx", ordered.orderComplete);
};
