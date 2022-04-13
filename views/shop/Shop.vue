<template>
  <div class="container">
    <div class="container__header">
      <div class="container__header__left">
        <span class="container__header__left__iconfont" @click="handleBackClick"
          >&#xe600;</span
        >
      </div>
      <div class="container__header__right">
        <span class="container__header__right__iconfont">&#xe6ac;</span>
        <input
          type="text"
          class="container__header__right__input"
          placeholder="请输入商品名称搜索"
        />
      </div>
    </div>
    <ShopInfo :item="item" :showBorder="false" v-if="item.imgUrl" />
    <Content :shopName="item.title" />
    <Cart :shopName="item.title" />
  </div>
</template>
<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'
import Content from './Content.vue'
import Cart from './Cart.vue'
import { useBackRouterEffect } from '../../views/effects/backEffect'
const useShopInfoEffect = () => {
  const route = useRoute()
  const item = ref({})
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    item.value = result.data.data
  }
  return { item, getItemData }
}

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart },
  setup () {
    const { item, getItemData } = useShopInfoEffect()
    const handleBackClick = useBackRouterEffect()
    getItemData()
    return { item, handleBackClick }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 0 18rem;
  &__header {
    width: 100%;
    height: 32rem;
    margin-top: 16rem;
    margin-bottom: 16rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__left__iconfont {
      color: #b6b6b6;
      font-size: 20rem;
    }
    &__right {
      position: relative;
      &__iconfont {
        color: #b7b7b7;
        font-size: 18rem;
        position: absolute;
        top: 6rem;
        left: 16rem;
      }
      &__input {
        width: 310rem;
        height: 32rem;
        background: #f5f5f5;
        border-radius: 16rem;
        padding: 0 44rem;
        box-sizing: border-box;
        font-family: PingFangSC-Regular;
        font-size: 14rem;
        color: #333333;
        line-height: 16rem;
      }
    }
  }
}
</style>
