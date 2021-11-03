import service from "./service";
export default {
  // 获取币的价格
  getCurrencyFun: (data: any) => {
    return service.get(`api/v2/tokens/${data}`);
  }
};
