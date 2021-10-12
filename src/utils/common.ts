import { wallet } from 'hashland-sdk';
import store from '../store/index'
export default {
  // 设置cookie过期时间
  setCookie(key: string, value: any, time: any) {
    // 1h = 60m = 60s = 1000ms   60*60*1000代表1小时
    let num = new Date(new Date().getTime() + time * 60 * 1000 * 60);
    console.log("🚗🚗🚗 ~~~ num", num, num.toUTCString());
    document.cookie =
      `${key} = ${value};expires = ` + num.toUTCString() + ";path = /";
  },
  // 获取cookie
  getCookie(c_name: any) {
    if (document.cookie.length > 0) {
      let c_start = document.cookie.indexOf(c_name + "=");
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        let c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1) {
          c_end = document.cookie.length;
        }
        return unescape(document.cookie.substring(c_start, c_end));
      }
    }
    return "";
  },
  // 数字加千分位
  numFormat(num: any, type = 1) {
    if (type === 0) {
      return "0.00";
    }
    if (num == undefined || num == "" || num == null || num == 0) {
      return "0";
    }
    num = num.toString().split("."); // 分隔小数点
    const arr = num[0].split("").reverse(); // 转换成字符数组并且倒序排列
    let res: any = [];
    for (let i = 0, len = arr.length; i < len; i++) {
      if (i % 3 === 0 && i !== 0) {
        res.push(","); // 添加分隔符
      }
      res.push(arr[i]);
    }
    res.reverse(); // 再次倒序成为正确的顺序
    if (num[1]) {
      // 如果有小数的话添加小数部分
      res = res.join("").concat("." + num[1]);
    } else {
      res = res.join("");
    }
    return res;
  },
  // 截取字符串  已开头字符串中间....尾部字符串显示   eg:wsx....efdf   参数解释str:需要展示的字符串;num:开头结尾需要展示几位
  getSubStr(str: any, num: number) {
    // console.log('str: ', str);
    let str1 = str.toString();
    if (str1) {
      const subStr1 = str1.substr(0, num);
      const subStr2 = str1.substr(str1.length - num);
      const subStr = subStr1 + "..." + subStr2;
      return subStr;
    } else {
      return "null";
    }
  },
  // 复制
  copyClick(params: any) {
    const dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.value = params;
    dummy.select(); // 选择对象
    document.execCommand("copy"); // 执行浏览器复制命令
    document.body.removeChild(dummy);
  },
  // 根据浏览器语言  自动切换中英文
  isLang() {
    // @ts-ignore
    const lang = (navigator.systemLanguage? navigator.systemLanguage: navigator.language).substr(0, 2);
    if (lang == "zh") {
      return "cn";
    } else {
      return "en";
    }
  },
  // 小数点后边有0  去掉0
  cutZero(old: any) {
    old = old.toString();
    //拷贝一份 返回去掉零的新串
    let newstr = old;
    //循环变量 小数部分长度
    let leng = old.length - old.indexOf(".") - 1;
    //判断是否有效数
    if (old.indexOf(".") > -1) {
      //循环小数部分
      for (let i = leng; i > 0; i--) {
        //如果newstr末尾有0
        if (
          newstr.lastIndexOf("0") > -1 &&
          newstr.substr(newstr.length - 1, 1) == "0"
        ) {
          let k = newstr.lastIndexOf("0");
          //如果小数点后只有一个0 去掉小数点
          if (newstr.charAt(k - 1) == ".") {
            return newstr.substring(0, k - 1);
          } else {
            //否则 去掉一个0
            newstr = newstr.substring(0, k);
          }
        } else {
          //如果末尾没有0
          return newstr;
        }
      }
    }
    return old;
  },
  // 去除e
  editE(num: any) {
    if (!num) return num;
    num = num.toString();
    if (num.indexOf("e") === -1) {
      return num;
    }
    let reg = /(?:(\d)+(?:.(\d+))?)[e]{1}-(\d)/.exec(num);
    if (!reg) {
      return num;
    }
    let v = num;
    if (reg[3] === "7") {
      v = "0.000000" + (reg[2] ? reg[1] + reg[2] : reg[1]);
    } else if (reg[3] === "8") {
      v = "0.0000000" + (reg[2] ? reg[1] + reg[2] : reg[1]);
    } else {
      v = 0;
    }
    return v;
  },
  // 截取小数点后的位数(bit传3,默认为2位)
  getBit(value: any, bit = 3) {
    if (value == 0) return 0;
    let str = value.toString();
    let strIndex = str.indexOf(".");
    if (strIndex === -1) return this.cutZero(str);
    str = str.substring(0, strIndex + bit);
    return this.cutZero(str);
  },
  /** 应用场景:获取到的时间转换为固定的时间格式;参数:时间;返回值:yy-mm-dd hh:mm:ss:ms */
  formatDate(date: any) {
    const myyear = date.getFullYear();
    let mymonth =
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1);
    let myweekday = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    let H = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
    let M = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
    let S = date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();
    let MS = date.getMilliseconds();
    return (
      myyear +
      "-" +
      mymonth +
      "-" +
      myweekday +
      " " +
      H +
      ":" +
      M +
      ":" +
      S +
      ":" +
      MS
    );
  },
  /** 应用场景:时间戳转相对应的日期格式;参数:时间戳(s);返回值:yy-mm-dd hh:mm:ss */
  timeFormat(targetDate: any) {
    targetDate = targetDate * 1000; // 需要用毫秒数
    let y: any = new Date(targetDate).getFullYear();
    let m: any = new Date(targetDate).getMonth() + 1;
    let d: any = new Date(targetDate).getDate();
    let H: any = new Date(targetDate).getHours();
    let M: any = new Date(targetDate).getMinutes();
    let S: any = new Date(targetDate).getSeconds();
    m = m > 9 ? m : "0" + m;
    d = d > 9 ? d : "0" + d;
    H = H > 9 ? H : "0" + H;
    M = M > 9 ? M : "0" + M;
    S = S > 9 ? S : "0" + S;
    return y + "-" + m + "-" + d + " " + H + ":" + M + ":" + S;
  },
  /** 应用场景:在某一个时刻点,按钮禁止点击;参数:传入结束时间戳(秒)(返回值为0,1,倒计时对象,含义:0代表按钮可以点,1代表不能点,其他数字代表倒计时正在进行)*/
  customTime(endtime: any, calback: any) {
    if (endtime == 0) {
      calback(0);
      return;
    }
    // @ts-ignore
    let time: any = Date.parse(new Date());
    // @ts-ignore
    time = parseInt(time / 1000);
    if (time <= endtime) {
      console.log(
        "还未到时间,结束时间:%s",
        new Date(endtime * 1000).toLocaleString()
      );
      let timernull = setInterval(() => {
        if (time == endtime) {
          clearInterval(timernull);
          calback(1);
          return;
        }
        time++;
        calback(timernull);
      }, 1000);
    } else {
      console.log(
        "已到设置的结束时间,结束时间:%s",
        new Date(endtime * 1000).toLocaleString()
      );
      calback(1);
    }
  },
  /** 应用场景:返回秒数,展示对应时间;参数:传入秒数(返回的是秒数对应的时间)*/
  afferentTime(endtime: any, calback: any) {
    // console.log('endtime: ', endtime);
    if (endtime == 0) {
      calback({ h: "00", m: "00", s: "00" });
      return;
    }
    let H: any = parseInt((endtime / (60 * 60)).toString());
    let M: any = parseInt(((endtime / 60) % 60).toString());
    let S: any = parseInt((endtime % 60).toString());
    H = H > 9 ? H : "0" + H;
    M = M > 9 ? M : "0" + M;
    S = S > 9 ? S : "0" + S;
    if (endtime == 0) {
      calback({ h: "00", m: "00", s: "00" });
      return;
    }
    calback({ h: H, m: M, s: S });
    endtime = endtime - 1;
  },
  // 链接钱包
  // LinkWallet(that:any){
  //   let obj = {
  //     account:'',
  //     chain:'',
  //     status:false
  //   }
  //   wallet.getAccount().then(sdk_account => {
  //     console.log('链接钱包sdk_account: ', sdk_account);
  //     // @ts-ignore
  //     obj.account = sdk_account

  //     wallet.getChainId().then(chain => {
  //       console.log('获取网络chain: ', chain);
  //       // @ts-ignore
  //       if(chain == store.state.chain){
  //         // @ts-ignore
  //         obj.chain = chain
  //         obj.status = true
  //       }else{
  //         // @ts-ignore
  //         obj.chain = chain
  //         obj.status = false
  //       }
  //       store.commit("setSDK", JSON.stringify(obj))
  //       localStorage.setItem("setSDK", JSON.stringify(obj))
  //       that.reload()
  //     }).catch(() => {
  //       obj.chain = ''
  //       obj.status = false
  //       store.commit("setSDK", JSON.stringify(obj))
  //       localStorage.setItem("setSDK", JSON.stringify(obj))
  //       that.reload()
  //     })
  //   }).catch(() => {
  //     obj.account = ''
  //     obj.status = false
  //   })

  //   // 账号切换
  //   wallet.onAccountChanged( (res:any) => {
  //     // @ts-ignore
  //     obj.account = res[0]
  //     store.commit("setSDK", JSON.stringify(obj))
  //     localStorage.setItem("setSDK", JSON.stringify(obj))
  //     that.reload()
  //   })
  //   // 网络切换
  //   wallet.onChainChanged( (res:any) => {
  //     console.log('切换网络res: ', res);
  //     if (res == store.state.chain){
  //       obj.chain = res
  //       obj.status = true
  //       store.commit("setSDK", JSON.stringify(obj))
  //       localStorage.setItem("setSDK", JSON.stringify(obj))
  //     }else {
  //       obj.chain = res
  //       obj.status = false
  //       store.commit("setSDK", JSON.stringify(obj))
  //       localStorage.setItem("setSDK", JSON.stringify(obj))
  //     }
  //     that.reload()
  //   })
  // }
};
