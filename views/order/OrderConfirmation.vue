<template>
  <div class="container">
    <div class="container__top">
      <div class="container__top__header">
        <div @click="handleBackClick" class="container__top__header__back">
          &#xe600;
        </div>
        <div class="container__top__header__text">确认订单</div>
      </div>
      <div class="container__top__receiver">
        <div class="container__top__receiver__left">
          <div class="container__top__receiver__left__title">收货地址</div>
          <div class="container__top__receiver__left__address">
            北京理工大学国防科技园2号楼10层
          </div>
          <div class="container__top__receiver__left__info">
            <div class="container__top__receiver__left__info__name">
              瑶妹（先生）
            </div>
            <div class="container__top__receiver__left__info__phone">
              18911024266
            </div>
          </div>
        </div>
        <div class="container__top__receiver__right">
          <div class="container__top__receiver__right__icon">&#xe665;</div>
        </div>
      </div>
    </div>
    <div class="container__order">
      <div class="container__order__shop-name">{{ shopName }}</div>
      <div class="container__order__info">
        <!-- 前两个 -->
        <div
          v-for="item of Object.keys(cartItems).slice(0, 2)"
          :key="item.id"
          class="container__order__info__item"
        >
          <div class="container__order__info__item__left">
            <img
              :src="cartItems[item].imgUrl"
              alt=""
              class="container__order__info__item__left__image"
            />
          </div>
          <div class="container__order__info__item__right">
            <div class="container__order__info__item__right__name">
              {{ cartItems[item].name }}
            </div>
            <div class="container__order__info__item__right__price">
              <div class="container__order__info__item__right__price__left">
                ¥{{ cartItems[item].promotionPrice }} x
                {{ cartItems[item].count }}
              </div>
              <div class="container__order__info__item__right__price__right">
                ¥{{
                  (
                    cartItems[item].promotionPrice * cartItems[item].count
                  ).toFixed(2)
                }}
              </div>
            </div>
          </div>
        </div>
        <!-- 后面的 -->
        <template v-if="!showMore">
          <div
            v-for="item of Object.keys(cartItems).slice(2)"
            :key="item.id"
            class="container__order__info__item"
          >
            <div class="container__order__info__item__left">
              <img
                :src="cartItems[item].imgUrl"
                alt=""
                class="container__order__info__item__left__image"
              />
            </div>
            <div class="container__order__info__item__right">
              <div class="container__order__info__item__right__name">
                {{ cartItems[item].name }}
              </div>
              <div class="container__order__info__item__right__price">
                <div class="container__order__info__item__right__price__left">
                  ¥{{ cartItems[item].promotionPrice }} x
                  {{ cartItems[item].count }}
                </div>
                <div class="container__order__info__item__right__price__right">
                  ¥{{
                    (
                      cartItems[item].promotionPrice * cartItems[item].count
                    ).toFixed(2)
                  }}
                </div>
              </div>
            </div>
          </div>
        </template>
        <div
          @click="showMoreClick"
          v-if="showMore && Object.keys(cartItems).length > 2"
          class="container__order__info__more"
        >
          共计商品{{ Object.keys(cartItems).length }}种/{{ sumNumber }}件
          &nbsp;&nbsp;&#xe686;
        </div>
      </div>
    </div>
    <div class="container__bottom">
      <div class="container__bottom__left">
        实付金额
        <span class="container__bottom__left__total-price"
          >¥{{ sumPrice }}</span
        >
      </div>
      <div @click="submitOrderClick" class="container__bottom__right">
        提交订单
      </div>
    </div>
    <div class="container__mask" v-if="maskShow">
      <div @click="blackPanelClick" class="container__mask__black-panel"></div>
      <div v-if="whitePanelShow" class="container__mask__white-panel">
        <div class="container__mask__white-panel__title">
          确认要离开收银台？
        </div>
        <div class="container__mask__white-panel__content">
          请尽快完成支付，否则将被取消
        </div>
        <div class="container__mask__white-panel__buttons">
          <div
            @click="cancelOrderClick"
            class="container__mask__white-panel__buttons__cancel"
          >
            取消订单
          </div>
          <div
            @click="confirmPayClick"
            class="container__mask__white-panel__buttons__confirm"
          >
            确认支付
          </div>
        </div>
      </div>
      <div class="container__mask__notice-panel" v-if="noticePanelShow">
        <div
          @click="cancelIconClick"
          class="container__mask__notice-panel__cancel-iconfont"
        >
          &#xe633;
        </div>
        <div class="container__mask__notice-panel__right-iconfont">
          &#xe604;
        </div>
        <div class="container__mask__notice-panel__notice">
          支付成功，等待配送
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useBackRouterEffect } from '../../views/effects/backEffect'
const useOrderEffect = () => {
  const store = useStore()
  const route = useRoute()
  // 获取店铺id
  const shopId = route.params.shopId
  // 获取购物车数据
  const cartData = store.state.cartData
  // 商品名称
  const shopName = cartData[shopId].shopName
  // 购物车商品列表
  const cartItems = cartData[shopId].itemList
  // 计算总价
  let sumPrice = 0.0
  for (const key in cartItems) {
    sumPrice += cartItems[key].count * cartItems[key].promotionPrice
  }
  sumPrice = sumPrice.toFixed(2)
  // 计算总数
  let sumNumber = 0
  for (const key in cartItems) {
    sumNumber += cartItems[key].count
  }
  // 返回数据
  return { shopName, cartItems, sumPrice, sumNumber }
}
const useShowMoreEffect = () => {
  const showMore = ref(true)
  const showMoreClick = () => {
    showMore.value = false
  }
  return { showMore, showMoreClick }
}
// 蒙层的显示隐藏逻辑
const maskShowEffect = () => {
  const store = useStore()
  const route = useRoute()
  const router = useRouter()
  // 获取店铺id
  const shopId = route.params.shopId
  // 蒙层显示, 默认false, 不显示
  const maskShow = ref(false)
  // 白色面板
  const whitePanelShow = ref(false)
  // 通知面板
  const noticePanelShow = ref(false)

  // 黑色蒙层点击逻辑
  const blackPanelClick = () => {
    // 整个蒙层隐藏
    maskShow.value = false
    // 白面板关闭
    whitePanelShow.value = false
    // 通知面板关闭
    noticePanelShow.value = false
    // 如果通知面板展示的话, 应该跳转到订单页
    router.push({ name: 'OrderList' })
  }
  // 订单返回点击效果
  const cancelOrderClick = () => {
    // 点击返回, 隐藏蒙层
    maskShow.value = false
    // 白面板关闭
    whitePanelShow.value = false
    // 通知面板关闭
    noticePanelShow.value = false
  }
  // 提交订单逻辑
  const submitOrderClick = () => {
    // 点击提交订单, 展示蒙层
    maskShow.value = true
    // 白面板关闭
    whitePanelShow.value = true
    // 通知面板关闭
    noticePanelShow.value = false
  }

  // 消息模板的叉号点击逻辑
  const cancelIconClick = () => {
    // 所有面板隐藏
    // 点击提交订单, 展示蒙层
    maskShow.value = false
    // 白面板关闭
    whitePanelShow.value = false
    // 通知面板关闭
    noticePanelShow.value = false
    // 跳转到订单页
    router.push({ name: 'OrderList' })
  }
  // 点击确认支付
  const confirmPayClick = () => {
    // 点击确认支付
    maskShow.value = true
    // 白面板关闭
    whitePanelShow.value = false
    // 通知面板关闭
    noticePanelShow.value = true
    // 清除购物车
    store.commit('clearCart', { shopId })
  }
  return {
    maskShow,
    blackPanelClick,
    submitOrderClick,
    cancelOrderClick,
    whitePanelShow,
    noticePanelShow,
    cancelIconClick,
    confirmPayClick
  }
}
export default {
  name: 'OrderConfirmation',
  setup () {
    const { shopName, cartItems, sumPrice, sumNumber } = useOrderEffect()
    const handleBackClick = useBackRouterEffect()
    const { showMore, showMoreClick } = useShowMoreEffect()
    const {
      maskShow,
      blackPanelClick,
      submitOrderClick,
      cancelOrderClick,
      whitePanelShow,
      noticePanelShow,
      cancelIconClick,
      confirmPayClick
    } = maskShowEffect()
    return {
      shopName,
      cartItems,
      handleBackClick,
      sumPrice,
      showMore,
      showMoreClick,
      sumNumber,
      blackPanelClick,
      cancelOrderClick,
      submitOrderClick,
      maskShow,
      whitePanelShow,
      noticePanelShow,
      cancelIconClick,
      confirmPayClick
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 49rem;
  background-color: #f8f8f8;
  &__top {
    &__header {
      height: 139rem;
      background-image: linear-gradient(
        0deg,
        rgba(0, 145, 255, 0) 4%,
        #0091ff 50%
      );
      background-repeat: no-repeat;
      &__back {
        font-size: 24rem;
        color: #fff;
        position: absolute;
        left: 18.5rem;
        top: 18rem;
      }
      &__text {
        text-align: center;
        padding-top: 21rem;
        font-family: PingFangSC-Regular;
        font-size: 16rem;
        color: #ffffff;
      }
    }
    &__receiver {
      width: 339rem;
      height: 111rem;
      background-color: #fff;
      border-radius: 4rem;
      margin: 0 auto;
      position: relative;
      top: -74rem;
      padding: 16rem;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      &__left {
        &__title {
          font-family: PingFangSC-Medium;
          font-size: 16rem;
          color: #333333;
          margin-bottom: 16rem;
        }
        &__address {
          font-family: PingFangSC-Regular;
          font-size: 14rem;
          color: #333333;
          margin-bottom: 8rem;
        }
        &__info {
          font-family: PingFangSC-Regular;
          font-size: 12rem;
          color: #666666;
          display: flex;
          &__name {
            margin-right: 6rem;
          }
        }
      }
      &__right {
        display: flex;
        align-items: center;
        font-size: 17rem;
        color: #666;
      }
    }
  }
  &__order {
    border-radius: 4rem;
    width: 339rem;
    background-color: #fff;
    margin: 0 auto;
    position: relative;
    top: -58rem;
    padding: 16rem;
    padding-bottom: 6rem;
    box-sizing: border-box;
    max-height: 400rem;
    overflow-y: auto;
    &__shop-name {
      font-family: PingFangSC-Medium;
      font-size: 16rem;
      color: #333333;
      margin-bottom: 16rem;
    }
    &__info {
      &__item {
        display: flex;
        margin-bottom: 6rem;
        &__left {
          &__image {
            width: 46rem;
            height: 46rem;
            margin-right: 16rem;
          }
        }
        &__right {
          flex-grow: 1;
          &__name {
            margin-top: 2rem;
            font-family: PingFangSC-Medium;
            font-size: 14rem;
            color: #333333;
            margin-bottom: 8rem;
          }
          &__price {
            display: flex;
            justify-content: space-between;
            &__left {
              font-family: PingFangSC-Regular;
              font-size: 28rem;
              color: #e93b3b;
              transform: scale(0.5, 0.5);
              transform-origin: left top;
              &::first-letter {
                font-size: 20rem;
              }
            }
            &__right {
              font-family: PingFangSC-Regular;
              font-size: 28rem;
              color: #000000;
              text-align: right;
              transform: scale(0.5, 0.5);
              transform-origin: right top;
              &::first-letter {
                font-size: 20rem;
              }
            }
          }
        }
      }
      &__more {
        width: 307rem;
        height: 28rem;
        background: #f5f5f5;
        margin: 0 auto;
        font-size: 14rem;
        color: #999999;
        line-height: 28rem;
        text-align: center;
        margin-bottom: 12rem;
      }
    }
  }
  &__bottom {
    display: flex;
    width: 375rem;
    height: 49rem;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #fff;
    &__left {
      padding-left: 24rem;
      box-sizing: border-box;
      width: 277rem;
      background-color: #fff;
      font-family: PingFangSC-Regular;
      font-size: 14rem;
      color: #333333;
      line-height: 49rem;
      &__total-price {
        font-family: PingFangSC-Medium;
        font-size: 16rem;
        color: #333333;
        text-align: right;
        line-height: 49rem;
      }
    }
    &__right {
      width: 98rem;
      background: #4fb0f9;
      font-family: PingFangSC-Medium;
      font-size: 14rem;
      color: #ffffff;
      text-align: center;
      line-height: 49rem;
    }
  }
  &__mask {
    &__black-panel {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
    }
    &__white-panel {
      box-sizing: border-box;
      padding-top: 24rem;
      width: 301rem;
      height: 157rem;
      background: #ffffff;
      border-radius: 4rem;
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      &__title {
        font-family: PingFangSC-Medium;
        font-size: 18rem;
        color: #333333;
        text-align: center;
        margin-bottom: 12rem;
      }
      &__content {
        font-family: PingFangSC-Regular;
        font-size: 14rem;
        text-align: center;
        color: #666666;
        margin-bottom: 26rem;
      }
      &__buttons {
        width: 184rem;
        height: 32rem;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        &__cancel {
          width: 80rem;
          height: 32rem;
          border: 1rem solid #4fb0f9;
          border-radius: 16rem;
          font-family: PingFangSC-Regular;
          font-size: 14rem;
          color: #0091ff;
          line-height: 32rem;
          text-align: center;
        }
        &__confirm {
          width: 80rem;
          height: 32rem;
          background: #4fb0f9;
          border: 1rem solid #4fb0f9;
          border-radius: 16rem;
          font-family: PingFangSC-Regular;
          font-size: 14rem;
          color: #ffffff;
          line-height: 32rem;
          text-align: center;
        }
      }
    }
    &__notice-panel {
      width: 301rem;
      height: 156rem;
      background: #ffffff;
      border-radius: 4rem;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      &__cancel-iconfont {
        font-size: 18rem;
        color: #666666;
        position: absolute;
        top: 12rem;
        right: 12rem;
      }
      &__right-iconfont {
        font-size: 56rem;
        color: #000;
        text-align: center;
        margin-top: 42rem;
        font-weight: bold;
      }
      &__notice {
        font-family: PingFangSC-Medium;
        font-size: 18rem;
        color: #333333;
        text-align: center;
        margin-top: 6rem;
      }
    }
  }
}
</style>
