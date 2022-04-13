<template>
  <div class="container__search">
    <span class="container__search__iconfont iconfont">&#xe6ac;</span>
    <input
      type="text"
      class="container__search__input"
      placeholder="山姆会员商店优惠商品"
    />
  </div>
</template>
<script>
export default {
  name: 'Search'
}
</script>
<style lang="scss" scoped>
.container__search {
  text-align: center;
  color: #b7b7b7;
  position: relative;
  &__iconfont {
    position: absolute;
    left: 34rem;
    top: 8rem;
    font-size: 16rem;
  }
  &__input {
    background-color: #f5f5f5;
    border-radius: 16rem;
    width: 339rem;
    height: 32rem;
    padding-left: 44rem;
    box-sizing: border-box;
    &::-webkit-input-placeholder {
      font-family: PingFangSC-Regular;
      font-size: 14rem;
      line-height: 16rem;
    }
    &:-moz-placeholder {
      font-family: PingFangSC-Regular;
      font-size: 14rem;
      line-height: 16rem;
    }
    &::-moz-placeholder {
      font-family: PingFangSC-Regular;
      font-size: 14rem;
      line-height: 16rem;
    }
    &:-ms-input-placeholder {
      font-family: PingFangSC-Regular;
      font-size: 14rem;
      line-height: 16rem;
    }
  }
}
</style>
