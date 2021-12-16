<template>
  <div class="page">
    <div class="ranking_box ranking_box1">
      <span class="ranking_title">奖励池</span>
      <div class="outside_box">
        <div class="in_box">
          <div class="ranking_content">
            <div class="col1col1">
              <div class="select_list flex_center_center">
                <span>第1赛季</span>
                <img class="accrow" :src="`${$store.state.imgUrl}accrow.png`" />
                <ul class="list">
                  <li>第1赛季</li>
                  <li>第2赛季</li>
                  <li>第3赛季</li>
                </ul>
              </div>
            </div>
            <div class="col2col2">
              <div class="col2col2_row">
                <div class="flex_center_center">PVE</div>
                <div class="flex_center_center">PVE</div>
                <div class="flex_center_center">PVE</div>
                <div class="flex_center_center">PVE</div>
                <div class="flex_center_center">PVE</div>
                <div class="col2col2_bottom">
                  <div class="flex_center_center">1111111111</div>
                  <div class="flex_center_center"><span>领取奖励</span></div>
                </div>
                <div class="col2col2_bottom">
                  <div class="flex_center_center">1111111111</div>
                  <div class="flex_center_center"><span>领取奖励</span></div>
                </div>
                <div class="col2col2_bottom">
                  <div class="flex_center_center">1111111111</div>
                  <div class="flex_center_center"><span>领取奖励</span></div>
                </div>
                <div class="col2col2_bottom">
                  <div class="flex_center_center">1111111111</div>
                  <div class="flex_center_center"><span>领取奖励</span></div>
                </div>
                <div class="col2col2_bottom">
                  <div class="flex_center_center">1111111111</div>
                  <div class="flex_center_center"><span>领取奖励</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ranking_box ranking_box2">
      <span class="ranking_title">个人奖励</span>
      <div class="outside_box">
        <div class="in_box">
          <div class="ranking_content">
            <div class="col1col1">
              <div class="select_list flex_center_center">
                <span>第1赛季</span>
                <img class="accrow" :src="`${$store.state.imgUrl}accrow.png`" />
                <ul class="list">
                  <li>第1赛季</li>
                  <li>第2赛季</li>
                  <li>第3赛季</li>
                </ul>
              </div>
              <div class="flex_center_center">
                <span>请绑定账户</span>
              </div>
            </div>
            <div class="col2col2">
              <div class="col2col2_title flex_center_center">$HCRaward</div>
              <div class="col2col2_row">
                <div class="col2col2_top flex_center_center">PVE</div>
                <div class="col2col2_top flex_center_center">PVE</div>
                <div class="col2col2_top flex_center_center">PVE</div>
                <div class="col2col2_top flex_center_center">PVE</div>
                <div class="col2col2_top flex_center_center">PVE</div>
                <div class="col2col2_bottom">
                  <div class="flex_center_center">1111111111</div>
                  <div class="flex_center_center"><span>领取奖励</span></div>
                </div>
                <div class="col2col2_bottom">
                  <div class="flex_center_center">1111111111</div>
                  <div class="flex_center_center"><span>领取奖励</span></div>
                </div>
                <div class="col2col2_bottom">
                  <div class="flex_center_center">1111111111</div>
                  <div class="flex_center_center"><span>领取奖励</span></div>
                </div>
                <div class="col2col2_bottom">
                  <div class="flex_center_center">1111111111</div>
                  <div class="flex_center_center"><span>领取奖励</span></div>
                </div>
                <div class="col2col2_bottom">
                  <div class="flex_center_center">1111111111</div>
                  <div class="flex_center_center"><span>领取奖励</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ranking_box">
      <span class="ranking_title">当前赛季奖励/排行</span>
      <div class="outside_box">
        <div class="in_box">
          <div class="ranking_content">
            <div class="col3">
              <div class="select_list flex_center_center">
                <span>第1赛季</span>
                <img class="accrow" :src="`${$store.state.imgUrl}accrow.png`" />
                <ul class="list">
                  <li>第1赛季</li>
                  <li>第2赛季</li>
                  <li>第3赛季</li>
                </ul>
              </div>
              <div class="col3_bottom flex_center_center">PVE</div>
              <div class="col3_bottom flex_center_center">PVP</div>
            </div>
            <div class="col4">
              <div class="col4_top flex_center_around">
                <span>Rank</span>
                <span>Address</span>
                <span>$HC Raward</span>
              </div>
              <div class="col4_bottom">
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
              </div>
              <div class="col4_bottom">
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
                <div class="flex_center"><span>Rank</span> <span>Address</span> <span>$HC Raward</span></div>
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
.ranking_box {
  width: 100%;
  background: #021c3b;
  box-shadow: -13px 10px 11px -2px rgba(2, 12, 23, 0.4), -2px -33px 101px 0px rgba(25, 47, 74, 0.5);
  border-radius: 6px;
  padding: 20px;
  margin-top: 50px;
  font-size: 0;
  .ranking_title {
    font-size: 26px;
  }
}
.outside_box {
  margin-top: 20px;
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
    font-size: 16px;
  }
}
.ranking_content {
  width: 100%;
  display: flex;
  text-align: center;
}
.select_list {
  position: relative;
  cursor: pointer;
  .accrow {
    margin-left: 10px;
    width: 15px;
    height: auto;
    transform: rotate(-90deg);
    transition: all 0.3s;
  }
  ul {
    width: 100%;
    height: auto;
    background: #082545;
    box-shadow: -1px 14px 9px -9px rgba(24, 24, 24, 0.56);
    border-radius: 0 0 6px 6px;
    overflow: hidden;
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    transform: scaleY(0);
    transition: transform 0.2s;
    transform-origin: top center;
    li {
      font-size: 16px;
      height: 50px;
      line-height: 50px;
      &:hover {
        background: #00e7f0;
      }
    }
  }
  &:hover {
    .select_list .accrow {
      transform: rotate(0);
    }
    ul {
      transform: scaleY(1);
    }
  }
}

.col1col1 {
  width: 15%;
  margin-right: 5px;
  div {
    width: 100%;
    height: 135px;
    background: #082545;
    border-radius: 6px;
  }
}
.col2col2 {
  width: 85%;
  padding: 5px;
  background: #082545;
  border-radius: 6px;
  .col2col2_row {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(5, 1fr);
    div {
      height: 60px;
      background: #103763;
      border-radius: 4px;
    }
    .col2col2_bottom {
      font-size: 12px;
      div {
        height: 50%;
        &:nth-child(2) {
          span {
            cursor: pointer;
            padding: 0 10px;
            background: #29cdda;
            border-radius: 7px;
            &:hover {
              background: #c111c6;
            }
          }
        }
      }
    }
  }
}
.ranking_box2 .col1col1 {
  div {
    width: 100%;
    height: 65px;
    background: #082545;
    border-radius: 6px;
    &:nth-child(2) {
      margin-top: 5px;
      background: #3d4f64;
    }
  }
}
.ranking_box2 .col2col2 {
  .col2col2_title {
    height: 30px;
  }
  .col2col2_row {
    .col2col2_top {
      height: 30px;
    }
  }
}

.col3 {
  width: 20%;
  height: 100%;
  font-size: 16px;
  div {
    background: #082545;
    border-radius: 6px;
    &:nth-child(1) {
      width: 100%;
      height: 65px;
    }
    &:nth-child(2),
    &:nth-child(3) {
      width: 100%;
      height: 200px;
      margin-top: 5px;
    }
  }
}

.col4 {
  width: 80%;
  height: 100%;
  margin-left: 10px;
  font-size: 16px;
  .col4_top {
    width: 100%;
    height: 65px;
    background: #082545;
    border-radius: 6px;
    padding-right: 10px; // 去掉滚动条的位置
    span {
      &:nth-child(1) {
        width: 30%;
      }
      &:nth-child(2) {
        width: 40%;
      }
      &:nth-child(3) {
        width: 30%;
      }
    }
  }
  .col4_bottom {
    width: 100%;
    height: 200px;
    background: #082545;
    border-radius: 6px;
    margin-top: 5px;
    padding: 5px;
    overflow-y: auto;
    div {
      width: 100%;
      height: 30px;
      font-size: 12px;
      span {
        &:nth-child(1) {
          width: 30%;
        }
        &:nth-child(2) {
          width: 40%;
        }
        &:nth-child(3) {
          width: 30%;
        }
      }
    }
    // 重置滚动条样式
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background: #68b0c8;
      border-radius: 5px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
  }
}

.flex_center {
  display: flex;
  align-items: center;
}
.flex_center_between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flex_center_around {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.flex_center_center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>