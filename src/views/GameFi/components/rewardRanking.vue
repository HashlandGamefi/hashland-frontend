<template>
  <div class="page">
    <div class="ranking_box flex-col">
      <span class="ranking_title">个人当前赛季奖励/排行</span>
      <div class="outside_box flex-col">
        <div class="in_box">
          <div class="ranking_content flex-row">
            <div class="col1 flex-col">
              <div class="col1_top">
                <span>第1期</span>
                <img
                  class="accrow"
                  src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng2798ece73400e62ba507e070f11f473c77bdd5ff862dfa9928230b26f6beae30"
                />
              </div>
              <div class="col1_bottom">
                <span>请绑定账户</span>
              </div>
            </div>
            <div class="col2 flex-col">
              <div class="col2_top">
                <span>$HCRaward</span>
                <div>
                  <span>PVE</span>
                  <span>PVP</span>
                </div>
              </div>
              <div class="col2_bottom"></div>
              <!-- <div class="group3 flex-col">
                <span class="word20">$HCRaward</span>
                <div class="group4 flex-row">
                  <div class="block3 flex-col"><span class="word21">PVE</span></div>
                  <div class="block4 flex-col"><span class="info6">PVP</span></div>
                </div>
                <div class="group5 flex-row">
                  <div class="outer4 flex-col"><span class="word22">1111111111</span></div>
                  <div class="outer5 flex-col"><span class="word23">1111111111</span></div>
                </div>
              </div> -->
            </div>
            <div class="col2 flex-col">
              <div class="group6 flex-col">
                <span class="info7">Rank</span>
                <div class="main9 flex-row">
                  <div class="group7 flex-col"><span class="word24">PVE</span></div>
                  <div class="group8 flex-col"><span class="word25">PVP</span></div>
                </div>
                <div class="main10 flex-row">
                  <div class="main11 flex-col"><span class="word26">1111111111</span></div>
                  <div class="main12 flex-col"><span class="info8">1111111111</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.flex-col {
  display: flex;
  flex-direction: column;
}
.flex-row {
  display: flex;
  flex-direction: row;
}
.ranking_box {
  width: 100%;
  background: linear-gradient(180deg, #010f20 0%, #021c3b 100%)
    linear-gradient(90deg, #021f3e 0%, #01142a 100%, #034088 100%);
  box-shadow: -13px 10px 11px -2px rgba(2, 12, 23, 0.4), -2px -33px 101px 0px rgba(25, 47, 74, 0.5);
  border-radius: 6px;
  padding: 20px;
}
.ranking_title {
  font-size: 26px;
}

.outside_box {
  width: 100%;
  background: #68b0c8;
  border-radius: 5px;
  padding: 1px;
  .in_box {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background: #01162d;
    padding: 10px;
  }
}
.ranking_content {
  display: flex;
  text-align: center;
  width: 100%;
  height: 120px;
  .col1 {
    width: 20%;
    height: 100%;
    font-size: 16px;
    cursor: pointer;
    .col1_top {
      width: 100%;
      height: 50%;
      background: #082545;
      border-radius: 6px;
      .accrow {
        margin-left: 10px;
        width: 15px;
        height: auto;
      }
    }
    .col1_bottom {
      width: 100%;
      height: 50%;
      background: #3d4f64;
      border-radius: 6px;
      margin-top: 5px;
    }
  }
  .col2 {
    width: 40%;
    height: 100%;
    background: #082545;
    border-radius: 6px;
    .col2_top {
      > span {
        font-size: 16px;
      }
      > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          width: 100%;
          font-size: 12px;
          background: #103763;
          border-radius: 4px;
        }
      }
    }
  }
}

.section4 {
  z-index: auto;
  width: 960px;
  height: 201px;
}

.info5 {
  z-index: 234;
  width: 294px;
  height: 37px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 26px;
  letter-spacing: 1.8571428060531616px;
  font-family: PingFangSC-Semibold;
  white-space: nowrap;
  line-height: 37px;
  text-align: justify;
  align-self: flex-start;
}

.mod2 {
  z-index: 224;
  height: 145px;
  border-radius: 7px;
  border: 1px solid;
  background-color: rgba(1, 22, 45, 1);
  align-self: flex-end;
  margin-top: 19px;
  width: 956px;
  justify-content: center;
  align-items: center;
}

.mod3 {
  z-index: auto;
  width: 938px;
  height: 125px;
  justify-content: space-between;
}

.main6 {
  z-index: auto;
  width: 194px;
  height: 125px;
}

.mod4 {
  z-index: 235;
  height: 61px;
  border-radius: 6px;
  background-color: rgba(8, 37, 69, 1);
  width: 194px;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 18px 24px 0 0;
}

.section5 {
  z-index: auto;
  width: 94px;
  height: 22px;
  justify-content: space-between;
}

.word18 {
  z-index: 236;
  width: 42px;
  height: 22px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  letter-spacing: 1.1428571939468384px;
  font-family: PingFangSC-Semibold;
  white-space: nowrap;
  line-height: 22px;
  text-align: justify;
}

.icon3 {
  z-index: 259;
  width: 14px;
  height: 7px;
  margin-top: 8px;
}

.mod5 {
  z-index: 237;
  height: 61px;
  border-radius: 6px;
  background-color: rgba(61, 79, 100, 1);
  margin-top: 3px;
  width: 194px;
  justify-content: center;
  align-items: flex-start;
  padding-left: 39px;
}

.word19 {
  z-index: 244;
  width: 86px;
  height: 22px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  letter-spacing: 1.1428571939468384px;
  font-family: PingFangSC-Semibold;
  white-space: nowrap;
  line-height: 22px;
  text-align: justify;
}

.main7 {
  z-index: 226;
  height: 125px;
  border-radius: 6px;
  background-color: rgba(8, 37, 69, 1);
  width: 369px;
  justify-content: center;
  align-items: center;
}

.group3 {
  z-index: auto;
  width: 357px;
  height: 110px;
}

.word20 {
  z-index: 227;
  width: 101px;
  height: 22px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  letter-spacing: 1.1428571939468384px;
  font-family: PingFangSC-Semibold;
  white-space: nowrap;
  line-height: 22px;
  text-align: justify;
  align-self: center;
}

.group4 {
  z-index: auto;
  width: 357px;
  height: 27px;
  margin-top: 5px;
  justify-content: space-between;
}

.block3 {
  z-index: 229;
  height: 27px;
  border-radius: 4px;
  background-color: rgba(16, 55, 99, 1);
  width: 177px;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2px 0 0 75px;
}

.word21 {
  z-index: 232;
  width: 24px;
  height: 17px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  letter-spacing: 0.8571428656578064px;
  font-family: Poppins-Regular;
  white-space: nowrap;
  line-height: 12px;
  text-align: justify;
}

.block4 {
  z-index: 230;
  height: 27px;
  border-radius: 4px;
  background-color: rgba(16, 55, 99, 1);
  width: 177px;
  justify-content: center;
  align-items: flex-start;
  padding-left: 73px;
}

.info6 {
  z-index: 231;
  width: 25px;
  height: 17px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  letter-spacing: 0.8571428656578064px;
  font-family: Poppins-Regular;
  white-space: nowrap;
  line-height: 12px;
  text-align: justify;
}

.group5 {
  z-index: auto;
  width: 357px;
  height: 52px;
  margin-top: 4px;
  justify-content: space-between;
}

.outer4 {
  z-index: 240;
  height: 52px;
  border-radius: 4px;
  background-color: rgba(16, 55, 99, 1);
  width: 177px;
  justify-content: center;
  align-items: center;
}

.word22 {
  z-index: 241;
  width: 49px;
  height: 17px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  letter-spacing: 0.8571428656578064px;
  font-family: Poppins-Regular;
  white-space: nowrap;
  line-height: 12px;
  text-align: justify;
}

.outer5 {
  z-index: 242;
  height: 52px;
  border-radius: 4px;
  background-color: rgba(16, 55, 99, 1);
  width: 177px;
  justify-content: center;
  align-items: center;
}

.word23 {
  z-index: 243;
  width: 49px;
  height: 17px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  letter-spacing: 0.8571428656578064px;
  font-family: Poppins-Regular;
  white-space: nowrap;
  line-height: 12px;
  text-align: justify;
}

.main8 {
  z-index: 246;
  height: 125px;
  border-radius: 6px;
  background-color: rgba(8, 37, 69, 1);
  width: 369px;
  justify-content: center;
  align-items: center;
}

.group6 {
  z-index: auto;
  width: 357px;
  height: 110px;
}

.info7 {
  z-index: 247;
  width: 44px;
  height: 22px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  letter-spacing: 1.1428571939468384px;
  font-family: PingFangSC-Semibold;
  white-space: nowrap;
  line-height: 22px;
  text-align: justify;
  align-self: flex-start;
  margin-left: 150px;
}

.main9 {
  z-index: auto;
  width: 357px;
  height: 26px;
  margin-top: 6px;
  justify-content: space-between;
}

.group7 {
  z-index: 249;
  height: 25px;
  border-radius: 4px;
  background-color: rgba(16, 55, 99, 1);
  margin-top: 1px;
  width: 177px;
  justify-content: center;
  align-items: flex-start;
  padding-left: 73px;
}

.word24 {
  z-index: 251;
  width: 24px;
  height: 17px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  letter-spacing: 0.8571428656578064px;
  font-family: Poppins-Regular;
  white-space: nowrap;
  line-height: 12px;
  text-align: justify;
}

.group8 {
  z-index: 250;
  height: 25px;
  border-radius: 4px;
  background-color: rgba(16, 55, 99, 1);
  width: 177px;
  justify-content: center;
  align-items: flex-start;
  padding-left: 73px;
}

.word25 {
  z-index: 252;
  width: 25px;
  height: 17px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  letter-spacing: 0.8571428656578064px;
  font-family: Poppins-Regular;
  white-space: nowrap;
  line-height: 12px;
  text-align: justify;
}

.main10 {
  z-index: auto;
  width: 357px;
  height: 52px;
  margin-top: 4px;
  justify-content: space-between;
}

.main11 {
  z-index: 255;
  height: 52px;
  border-radius: 4px;
  background-color: rgba(16, 55, 99, 1);
  width: 177px;
  justify-content: center;
  align-items: center;
}

.word26 {
  z-index: 256;
  width: 49px;
  height: 17px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  letter-spacing: 0.8571428656578064px;
  font-family: Poppins-Regular;
  white-space: nowrap;
  line-height: 12px;
  text-align: justify;
}

.main12 {
  z-index: 257;
  height: 52px;
  border-radius: 4px;
  background-color: rgba(16, 55, 99, 1);
  width: 177px;
  justify-content: center;
  align-items: center;
}

.info8 {
  z-index: 258;
  width: 49px;
  height: 17px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  letter-spacing: 0.8571428656578064px;
  font-family: Poppins-Regular;
  white-space: nowrap;
  line-height: 12px;
  text-align: justify;
}

// .ranking_box {
//   width: 100%;
//   height: auto;
//   background: linear-gradient(180deg, #010f20 0%, #021c3b 100%)
//     linear-gradient(90deg, #021f3e 0%, #01142a 100%, #034088 100%);
//   box-shadow: -13px 10px 11px -2px rgba(2, 12, 23, 0.4), -2px -33px 101px 0px rgba(25, 47, 74, 0.5);
//   border-radius: 6px;
// }
</style>