<template>
  <div class="container__nav">
    <div
      v-for="(item, index) of navItems"
      :key="index"
      class="container__nav__item"
    >
      <img class="container__nav__item__img" :src="item.imgUrl" alt="" />
      <span class="container__nav__item__text">{{ item.text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  setup () {
    const navItems = [
      {
        imgUrl:
          'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843776.png',
        text: '超市便利'
      },
      {
        imgUrl:
          'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843550.png',
        text: '菜市场'
      },
      {
        imgUrl:
          'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843505.png',
        text: '水果店'
      },
      {
        imgUrl:
          'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843412.png',
        text: '鲜花绿植'
      },
      {
        imgUrl:
          'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844276.png',
        text: '医药健康'
      },
      {
        imgUrl:
          'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844145.png',
        text: '家居时尚'
      },
      {
        imgUrl:
          'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844545.png',
        text: '烘培蛋糕'
      },
      {
        imgUrl:
          'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844072.png',
        text: '签到'
      },
      {
        imgUrl:
          'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844735.png',
        text: '大牌免运'
      },
      {
        imgUrl:
          'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844286.png',
        text: '红包套餐'
      }
    ]
    return { navItems }
  }
}
</script>
<style lang="scss" scoped>
.container__nav {
  display: flex;
  flex-wrap: wrap;
  margin-top: 16rem;
  &__item {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16rem;
    &__img {
      width: 40rem;
      height: 40rem;
      margin-bottom: 6rem;
      &__text {
        font-family: PingFangSC-Regular;
        font-size: 12rem;
        color: #333333;
        text-align: center;
      }
    }
  }
}
</style>
