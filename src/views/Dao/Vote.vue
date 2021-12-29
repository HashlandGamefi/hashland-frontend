<template>
  <div class="vote_page">
    <div class="content">
      <div class="out_box">
        <div class="box">
          <p class="fontsize16 txt">{{ $t("message.dao.txt24") }}</p>
          <p class="fontsize16 txt marg_top">{{ $t("message.dao.txt25") }}<span @click="snapshotClick">{{ $t("message.dao.txt26") }}</span>{{ $t("message.dao.txt27") }}</p>
        </div>
        <img :src="`${$store.state.imgUrl}vote1.png`" class="game1_img" />
        <img :src="`${$store.state.imgUrl}vote2.png`" class="game2_img" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    snapshotClick(){
      window.location.href = 'https://snapshot.org/#/hashland.eth'
    }
  },
};
</script>

<style lang='scss' scoped>
.vote_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 33px;
  .content{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .out_box{
      position: relative;
      width: 500px;
      height: 260px;
      padding: 1px;
      box-shadow: -15px 11px 40px 21px rgba(0, 0, 1, 0.38), -2px 1px 34px 0px rgba(255, 255, 255, 0.22);
      border-radius: 14px;
      background:linear-gradient(180deg, #8BE6FE 0%, rgba(139, 230, 254, 0) 100%);
      .box{
        width: 100%;
        height: 100%;
        border-radius: 14px;
        background:#011A31;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .txt{
          color: #ffffff;
          span{
            color: #29CDDA;
            text-decoration: underline;
            cursor: pointer;
          }
        }
        .marg_top{
          margin-top: 10px;
        }
      }
      .game1_img{
        position: absolute;
        left: -86px;
        bottom: -24px;
        width: 134px;
        object-fit: contain;
      }
      .game2_img{
        position: absolute;
        right: -64px;
        bottom: -24px;
        width: 115px;
        object-fit: contain;
      }
    }
  }
}
@media screen and (max-width: 980px) {
  .vote_page {
    width: 100%;
    padding: 0 0.2rem;
    display: flex;
    flex-direction: column;
    margin-top: 0.4rem;
    .content{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .out_box{
        position: relative;
        width: 2.68rem;
        height: 1.41rem;
        padding: 1px;
        box-shadow: -15px 11px 40px 21px rgba(0, 0, 1, 0.38), -2px 1px 34px 0px rgba(255, 255, 255, 0.22);
        border-radius: 0.14rem;
        background:linear-gradient(180deg, #8BE6FE 0%, rgba(139, 230, 254, 0) 100%);
        .box{
          width: 100%;
          height: 100%;
          padding: 0 0.2rem;
          border-radius: 0.14rem;
          background:#011A31;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .txt{
            color: #ffffff;
            font-size: 0.12rem;
            span{
              color: #29CDDA;
              text-decoration: underline;
              cursor: pointer;
            }
          }
          .marg_top{
            margin-top: 0.1rem;
          }
        }
        .game1_img{
          position: absolute;
          left: -0.4rem;
          bottom: -0.1rem;
          width: 0.63rem;
          object-fit: contain;
        }
        .game2_img{
          position: absolute;
          right: -0.3rem;
          bottom: -0.1rem;
          width: 0.55rem;
          object-fit: contain;
        }
      }
    }
  }
}
</style>
