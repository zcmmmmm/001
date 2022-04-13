<template>
  <div class="container__header">
    <div class="container__header__left">
      <span class="container__header__left__position-iconfont iconfont"
        >&#xe679;</span
      >
      <span class="span container__header__left__position-text">
        北京理工大学国防科技园2号楼10层
      </span>
    </div>
    <div class="container__header__right">
      <span class="container__header__right__notice-iconfont iconfont"
        >&#xe61d;</span
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header'
}
</script>
<style lang="scss" scoped>
@import '../../style/mixins.scss';
@import '../../style/variables.scss';
.container__header {
  display: flex;
  justify-content: space-between;
  padding: 16rem 19.2rem;
  &__left {
    width: 310rem;
    @include ellipsis;
    &__position-iconfont {
      color: #333333;
      margin-right: 9.7rem;
      font-size: 16rem;
    }
    &__position-text {
      font-family: PingFangSC-Regular;
      font-size: 16rem;
      color: $content-fontcolor;
    }
  }
  &__right__notice-iconfont {
    color: #000000;
    font-size: 16rem;
  }
}
</style>
