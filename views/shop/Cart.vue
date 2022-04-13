<template>
  <!-- 蒙层 -->
  <div
    @click="
      () => {
        handleCartShowChange(cartItems)
      }
    "
    class="mask"
    v-if="cartShow && JSON.stringify(cartItems) !== '{}'"
  ></div>
  <div class="cart">
    <!-- 头部, 全选 -->
    <div
      v-if="cartShow && JSON.stringify(cartItems) !== '{}'"
      class="cart__header"
    >
      <div class="cart__header__left">
        <div
          @click="
            () => {
              setAllChecked(shopId)
            }
          "
          v-if="allChecked"
          class="cart__header__left__checked-iconfont"
        >
          &#xe618;
        </div>
        <div
          @click="
            () => {
              setAllChecked(shopId)
            }
          "
          v-else
          class="cart__header__left__unchecked-iconfont"
        >
          &#xe933;
        </div>
        <div class="cart__header__left__text">全选</div>
      </div>
      <div class="cart__header__right">
        <div
          @click="
            () => {
              clearCart(shopId)
            }
          "
          class="cart__header__right__clear-cart"
        >
          清空购物车
        </div>
      </div>
    </div>
    <!-- 详情信息 -->
    <div
      v-if="cartShow && JSON.stringify(cartItems) !== '{}'"
      class="cart__detail"
    >
      <div v-for="item of cartItems" :key="item.id" class="cart__detail__item">
        <div class="cart__detail__item__left">
          <!-- 选中/不选中 字体图标 -->
          <div
            @click="
              () => {
                changeItemChecked(shopId, item.id)
              }
            "
            v-if="item.checked"
            class="cart__detail__item__left__checked-iconfont"
          >
            &#xe618;
          </div>
          <div
            @click="
              () => {
                changeItemChecked(shopId, item.id)
              }
            "
            v-else
            class="cart__detail__item__left__unchecked-iconfont"
          >
            &#xe933;
          </div>
          <!-- 商品的图片 -->
          <img
            :src="item.imgUrl"
            alt=""
            class="cart__detail__item__left__image"
          />
          <!-- 商品信息 -->
          <div class="cart__detail__item__left__cart-info">
            <!-- 商品标题 -->
            <div class="cart__detail__item__left__cart-info__title">
              {{ item.name }}
            </div>
            <!-- 商品价格 -->
            <div class="cart__detail__item__left__cart-info__price">
              <div
                class="cart__detail__item__left__cart-info__price__promotion"
              >
                ¥{{ item.promotionPrice }}
              </div>
              <div class="cart__detail__item__left__cart-info__price__original">
                ¥{{ item.originalPrice }}
              </div>
            </div>
          </div>
        </div>
        <div class="cart__detail__item__right">
          <span
            @click="
              () => {
                changeItemToCart(shopId, shopName, item.id, item, -1)
              }
            "
            v-show="cartData?.[shopId]?.itemList?.[item.id]?.['count']"
            class="cart__detail__item__right__minus-iconfont"
          >
            &#xe780;
          </span>
          <span
            v-show="cartData?.[shopId]?.itemList?.[item.id]?.['count']"
            class="cart__detail__item__right__number"
          >
            {{ cartData?.[shopId]?.itemList?.[item.id]?.['count'] }}
          </span>
          <span
            @click="
              () => {
                changeItemToCart(shopId, shopName, item.id, item, 1)
              }
            "
            class="cart__detail__item__right__plus-iconfont"
          >
            &#xe845;
          </span>
        </div>
      </div>
    </div>
    <!-- 购物车总计 -->
    <div class="cart__count">
      <div class="cart__count__left">
        <div
          @click="
            () => {
              handleCartShowChange(cartItems)
            }
          "
          class="cart__count__left__icon"
        >
          <img
            src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202261637089.png"
            alt=""
            class="cart__count__left__icon__image"
          />
          <span class="cart__count__left__icon__number">{{ total }}</span>
        </div>
        <div class="cart__count__left__count">
          总计:
          <span class="cart__count__left__count__price">¥ {{ sumPrice }}</span>
        </div>
      </div>
      <router-link :to="total ? { path: `/order-confirmation/${shopId}` } : ''">
        <div class="cart__count__right">去结算</div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../views/effects/commonCartEffect'
const useCartEffect = (cartShow) => {
  const store = useStore()
  const route = useRoute()
  // 获取商铺id
  const shopId = route.params.id
  // 获取购物车数据
  const cartData = store.state.cartData
  // 定义计算属性
  const total = computed(() => {
    // 获取商铺的所有商品
    const itemList = cartData[shopId]?.itemList || {}
    let count = 0
    if (itemList) {
      for (const key in itemList) {
        count += itemList[key].count
      }
    }
    return count
  })

  // 计算总价
  const sumPrice = computed(() => {
    // 获取店铺所有商品
    const itemList = cartData[shopId]?.itemList || {}
    let sum = 0.0
    if (itemList) {
      for (const key in itemList) {
        if (itemList[key].checked) {
          sum += itemList[key].count * itemList[key].promotionPrice
        }
      }
    }
    return sum.toFixed(2)
  })

  // 计算全选
  const allChecked = computed(() => {
    // 获取所有商品
    const itemList = cartData[shopId]?.itemList || {}
    // 定义状态默认全选
    let result = true
    if (itemList) {
      for (const key in itemList) {
        if (!itemList[key].checked) {
          result = false
        }
      }
    }
    return result
  })
  // 购物车详情
  const cartItems = computed(() => {
    const cartItems = cartData[shopId]?.itemList || {}
    if (JSON.stringify(cartItems) === '{}') {
      cartShow.value = false
    }
    return cartItems
  })
  return { total, sumPrice, cartItems, shopId, allChecked }
}
const useCartShowEffect = () => {
  const cartShow = ref(false)
  const handleCartShowChange = (cartItems) => {
    // 购物车有数据，再进行状态切换
    if (JSON.stringify(cartItems) !== {}) {
      cartShow.value = !cartShow.value
    }
  }
  return { cartShow, handleCartShowChange }
}
export default {
  name: 'Cart',
  props: ['shopName'],
  setup () {
    const {
      cartData,
      changeItemToCart,
      changeItemChecked,
      clearCart,
      setAllChecked
    } = useCommonCartEffect()
    const { cartShow, handleCartShowChange } = useCartShowEffect()
    const { total, sumPrice, cartItems, shopId, allChecked } =
      useCartEffect(cartShow)

    return {
      total,
      sumPrice,
      cartItems,
      shopId,
      cartData,
      changeItemChecked,
      changeItemToCart,
      clearCart,
      allChecked,
      setAllChecked,
      useCartShowEffect,
      cartShow,
      handleCartShowChange
    }
  }
}
</script>
<style lang="scss" scoped>
// src\views\shop\Cart.vue
@import '../../style/mixins.scss';
.mask {
  position: fixed;
  background-color: rgba($color: #000, $alpha: 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 49rem;
}
.cart {
  position: fixed;
  background-color: #fff;
  width: 375rem;
  left: 0;
  bottom: 0;
  &__header {
    box-sizing: border-box;
    padding: 0 18rem;
    width: 100%;
    height: 52rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1rem solid #f1f1f1;
    &__left {
      display: flex;
      align-items: center;
      &__checked-iconfont {
        font-size: 19rem;
        margin-right: 9rem;
        color: #0091ff;
      }
      &__unchecked-iconfont {
        font-size: 19rem;
        margin-right: 9rem;
        color: #0091ff;
      }
      &__text {
        font-family: PingFangSC-Regular;
        font-size: 14rem;
        color: #333333;
        line-height: 16rem;
      }
    }
    &__right {
      &__clear-cart {
        font-family: PingFangSC-Regular;
        font-size: 14rem;
        color: #333333;
        text-align: right;
        line-height: 16rem;
      }
    }
  }
  &__detail {
    box-sizing: border-box;
    width: 100%;
    padding: 0 18rem;
    &__item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16rem;
      margin-top: 16rem;
      &__left {
        display: flex;
        align-items: center;
        &__checked-iconfont {
          font-size: 19rem;
          margin-right: 9rem;
          color: #0091ff;
        }
        &__unchecked-iconfont {
          font-size: 19rem;
          margin-right: 9rem;
          color: #0091ff;
        }
        &__image {
          width: 46rem;
          height: 46rem;
          margin-left: 16.4rem;
          margin-right: 16rem;
        }
        &__cart-info {
          &__title {
            font-family: PingFangSC-Medium;
            font-size: 14rem;
            color: #333333;
            margin-bottom: 6rem;
          }
          &__price {
            display: flex;
            align-items: center;
            &__promotion {
              font-family: PingFangSC-Semibold;
              font-size: 14rem;
              color: #e93b3b;
              line-height: 20rem;
              margin-right: 8rem;
              &::first-letter {
                font-size: 10rem;
              }
            }
            &__original {
              font-family: PingFangSC-Regular;
              font-size: 10rem;
              color: #999999;
              line-height: 20rem;
              text-decoration: line-through;
            }
          }
        }
      }
      &__right {
        display: flex;
        align-items: center;
        &__minus-iconfont {
          color: #666666;
          font-size: 20rem;
        }
        &__number {
          font-family: PingFangSC-Regular;
          font-size: 14rem;
          color: #333333;
          margin-left: 10rem;
          margin-right: 10rem;
        }
        &__plus-iconfont {
          font-size: 17rem;
          color: #0091ff;
        }
      }
    }
  }
  &__count {
    box-shadow: 0 -1rem 1rem 0 #f1f1f1;
    left: 0;
    right: 0;
    bottom: 0;
    height: 49rem;
    // background-color: olivedrab;
    display: flex;
    justify-content: space-between;
    a {
      text-decoration: none;
    }
    &__left {
      display: flex;
      align-items: center;
      &__icon {
        position: relative;
        margin-left: 24rem;
        margin-right: 32rem;
        &__image {
          width: 28rem;
          height: 26rem;
        }
        &__number {
          display: block;
          min-width: 20rem;
          height: 20rem;
          background: #e93b3b;
          border-radius: 10rem;
          font-family: PingFangSC-Medium;
          font-size: 16rem;
          transform: scale(0.5, 0.5);
          transform-origin: left top;
          color: #ffffff;
          text-align: center;
          position: absolute;
          left: 24rem;
          top: -4rem;
        }
      }
      &__count {
        display: flex;
        align-items: center;
        font-family: PingFangSC-Regular;
        font-size: 12rem;
        color: #333333;
        &__price {
          font-family: PingFangSC-Medium;
          font-size: 18rem;
          color: #e93b3b;
        }
      }
    }
    &__right {
      width: 98rem;
      height: 49rem;
      background-color: #4fb0f9;
      font-family: PingFangSC-Medium;
      font-size: 14rem;
      color: #ffffff;
      text-align: center;
      line-height: 49rem;
    }
  }
}
</style>
