import BigNumber from 'bignumber.js'
import i18n from '../i18n/index'
import { hn,getSigner,hc,getHnImg} from 'hashland-sdk'
import store from '@/store';
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
  // 保留小数位数---已调用cutZero函数,截取出来的小数最后有0则去掉0
  getBit(value: any, bit = 2) {
    if (value == 0) return 0;
    let str = value.toString();
    let strIndex = str.indexOf(".");
    if (strIndex === -1) return this.cutZero(str);
    str = str.substring(0, strIndex + bit + 1);
    return this.cutZero(str);
  },
  // 使用bignumbers计算  保留小数位  eg:num / 1e18保留8位
  useBigNumberDiv(num:any,bit = 8,nums = 1000000000000000000){
    let big_number = new BigNumber(num)
    let last_num = big_number.div(nums)
    if(bit == 0){
      return this.editE(last_num.toNumber())
    }else{
      return this.editE(last_num.dp(bit).toNumber())
    }
  },
  //bignumbers---乘法
  useBignumberMultipliedBy(num:number,nums:number,bit = 0){
    let x = new BigNumber(num)
    let result = x.times(nums) // 1.8
    if(bit == 0){
      return result.toNumber()
    }else{
      return result.dp(bit).toNumber()
    }
  },
  //bignumbers---加法
  useBignumberPlus(num:number,nums:number,bit = 0){
    let x = new BigNumber(num)
    let result = x.plus(nums)
    if(bit == 0){
      return result.toNumber()
    }else{
      return result.dp(bit).toNumber()
    }
  },
  //bignumbers---减法
  useBignumberMinus(num:number,nums:number,bit = 0){
    let x = new BigNumber(num)
    let result = x.minus(nums)
    if(bit == 0){
      return result.toNumber()
    }else{
      return result.dp(bit).toNumber()
    }
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
  timeFormat(targetDate: any,type = 1) {
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
    if(type == 1){
      return y + "-" + m + "-" + d + " " + H + ":" + M + ":" + S;
    }else{
      return y + "-" + m + "-" + d
    }

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
  // 数字中是否带有e,有的话截取固定位数小数(bit),保留e的位数,没有则按正常显示(digit为要保留的小数位)
  checkNumber(str:string,callback:any,digit = 8,bit = 4){
    if(str.indexOf('e') != -1){
      callback(str.substring(0,str.indexOf('.') + bit) + str.substring(str.indexOf('e')))
    }else{
      callback(this.numFormat(this.getBit(str,digit)))
    }
  },
  // 中英文环境
  selectLang(chinse:string,english:string,that:any){
    if (i18n.locale == 'cn') {
      that.word = chinse //'提取成功'
      that.btntxt = '确认'
    } else {
      that.word = english //'Claim success'
      that.btntxt = 'Confirm'
    }
    that.proupDis = true
  },
  // 是否授权
  async isApproveFun(type:number,account:string,contractAdrdess:string){
    if(type == 1){
      return await hn().isApprovedForAll(account,contractAdrdess)
    }else{
      return await hc().allowance(account,contractAdrdess)
    }
  },
  // 去授权
  async delegatingFun(type:number,contractAdrdess:string){
    if(type == 1){
      return await hn().connect(getSigner()).setApprovalForAll(contractAdrdess,true)
    }else{
      const TOKEN_amount = '50000000000000000000000000000000000000000000000000000000000';
      return await hc().connect(getSigner()).approve(contractAdrdess,TOKEN_amount)
    }
  },
  // 获取用户的所有卡牌信息
  async getUserCardInfoFun(account:string){
    hn().tokensOfOwnerBySize(account,0,1000000).then( async res => {//0代表第一次拿数据  100000000代表用户所拥有的全部卡的id
      console.log('公共的获取到的用户的所有卡牌信息', res[0]);
      let infoArr:any = []
      res[0].map(async item => {
        let obj = {
          cardID:'',
          level:'',
          hc:'',
          btc:'',
          src:'',
          status:false, // 选中与未选中
          ismaster:false,//主牌设置
        }
        obj.cardID = item.toString() // 卡牌的id
        obj.level = (await hn().level(item)).toString() // 等级
        obj.src = await getHnImg(Number(obj.cardID),Number(obj.level))
        let race = await hn().getHashrates(item) // hc 算力
        obj.hc = race[0].toString()
        obj.btc = race[1].toString()// btc 算力
        infoArr.push(obj)
        store.commit("setCardInfo",JSON.stringify(infoArr))
        localStorage.setItem("setCardInfo",JSON.stringify(infoArr))
        // store.commit("setCardInfo",infoArr)
        // localStorage.setItem("setCardInfo",infoArr)
      })
    })
  },
  // 函数节流
  flowFun(fn:any,that:any) {
    console.log("节流函数")
    let canRun = true; // 通过闭包保存一个标记
    return function () {
      if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
      canRun = false; // 立即设置为false
      setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
        fn.apply(that, arguments);
        // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
        canRun = true;
      }, 500);
    };
  },
  // async getUserCardInfoFun(account:string){
  //   hn().tokensOfOwnerBySize(account,0,100000000).then( async res => {//0代表第一次拿数据  100000000代表用户所拥有的全部卡的id
  //     console.log('公共的获取到的用户的所有卡牌信息', res[0]);
  //     let infoArr:any = [
  //       {level:1,arr:[]},
  //       {level:2,arr:[]},
  //       {level:3,arr:[]},
  //       {level:4,arr:[]},
  //       {level:5,arr:[]}
  //     ]
  //     res[0].map(async item => {
  //       let obj = {
  //         cardID:'',
  //         level:'',
  //         hc:'',
  //         btc:'',
  //         src:'',
  //         status:false, //设置一个状态供需要的地方使用
  //         ismaster:false,//主牌设置
  //       }
  //       obj.cardID = item.toString() // 卡牌的id
  //       obj.level = (await hn().level(item)).toString() // 等级
  //       obj.src = await getHnImg(Number(obj.cardID),Number(obj.level),'../assets/')
  //       console.log('obj.src: ', obj.src);
  //       let race = await hn().getHashrates(item) // hc 算力
  //       obj.hc = race[0].toString()
  //       obj.btc = race[1].toString()// btc 算力
  //       if(obj.level == '1'){
  //         infoArr[0].arr.push(obj)
  //       }
  //       if(obj.level == '2'){
  //         infoArr[1].arr.push(obj)
  //       }
  //       if(obj.level == '3'){
  //         infoArr[2].arr.push(obj)
  //       }
  //       if(obj.level == '4'){
  //         infoArr[3].arr.push(obj)
  //       }
  //       if(obj.level == '5'){
  //         infoArr[4].arr.push(obj)
  //       }
  //       // infoArr.push(obj)
  //       store.commit("setCardInfo",JSON.stringify(infoArr))
  //       localStorage.setItem("setCardInfo",JSON.stringify(infoArr))
  //     })
  //   })
  // }
  // async connect(){
    // console.log("点击函数")
    // let zccount = await window.ethereum.enable();
    // console.log('zccount: ', zccount);
    // const tx = await getSigner().sendTransaction({
    //   to: "0x16FEC748C51B702eCC4ACCe122EcF9059f7fBd1C",
    //   value: util.parseEther("0.001")
    // });
    // console.log("tx:",tx)

    // let box = hnBox()
    // console.log('box: ', box);
    // const a =await box.boxTokenPrices(0)
    // console.log('a: ', a);

    // let hnContract = hn();
    // const totalSupply = await hnContract.totalSupply();
    // console.log('直接获取合约返回的数转tostring():', totalSupply.toString());
    // console.log('传的数转bignumber直接能被合约调用:',util.parseUnits('5', 18))
    // console.log('把十八位数转换成十进制数:', util.formatEther('2000000000000000000'));
    // console.log('把十八位数转换成十进制数:', util.formatEther(''+3*1e18));
    // console.log('把整数转换成相应的小数位:',util.formatUnits('123456000000000000', 18)) // 0.123456

    // let trasfer = await hnContract.connect(getSigner()).transferFrom('0x16FEC748C51B702eCC4ACCe122EcF9059f7fBd1C','0x16FEC748C51B702eCC4ACCe122EcF9059f7fBd1C',0)
    // console.log('trasfer: ', trasfer);

    // const tx1 = await hnContract.renameHn(0, "123");
    // console.log('tx: ', tx1);

    // const approve = await hnContract.setApprovalForAll('0xCfd90244D4788b61d1d79A77748C74a26d8b752b',true)
    // console.log('approve: ', approve);
  // }
};
