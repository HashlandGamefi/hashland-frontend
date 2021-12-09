import axios from "axios";
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // timeout: 15 * 1000, // 过期时间
  headers: {
    // "X-Requested-With": "XMLHttpRequest"
    // 'ETHST-BRIDGE-SIGNATURE': 'OK'
  }
});

// post 以formData传参(表单形式)
// service.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

service.defaults.headers.post["Content-Type"] = "application/json";
service.interceptors.request.use(
  config => {
    // 发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
    // 最后return config
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// 响应拦截
service.interceptors.response.use(
  response => {
    //接收到响应数据并成功后的一些共有的处理，关闭loading等
    if (response.status == 200) {
      return response.data.data;
    } else {
      return response;
    }
  },
  error => {
    //如果不需要错误处理，以上的处理过程都可省略
    return Promise.resolve(error.response);
  }
);

//请求方法封装，拷贝直接用~
export default {
  /**
   *
   * @param url 请求地址
   * @param data 请求数据  不传为空
   */
  get(url: string, data: object = {}) {
    return new Promise((resolve, reject) => {
      service
        .get(url, { params: data })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   *
   * @param url 请求地址
   * @param data 请求数据  不传为空
   */

  // 表单形式对应的参数形式为    .post(url, qs.stringify(data))
  post(url: string, data: object) {
    return new Promise((resolve, reject) => {
      service
        .post(url, data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
