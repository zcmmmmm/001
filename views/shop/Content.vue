<template>
  <div class="content">
    <div class="content__left">
      <div
        @click="() => handleLeftItemChange(item.name)"
        v-for="item of leftItems"
        :key="item.name"
        tab-name="all"
        :class="{
          content__left__item: true,
          'content__left__item--active': item.name === currentItemName
        }"
      >
        {{ item.text }}
      </div>
    </div>
    <div class="content__right">
      <div
        v-for="item of rightItems"
        :key="item.id"
        class="content__right__item"
      >
        <div class="content__right__item__left">
          <img
            :src="item.imgUrl"
            alt=""
            class="content__right__item__left__image"
          />
        </div>
        <div class="content__right__item__right">
          <div class="content__right__item__right__top">{{ item.name }}</div>
          <div class="content__right__item__right__middle">
            月售{{ item.sales }}件
          </div>
          <div class="content__right__item__right__bottom">
            <div class="content__right__item__right__bottom__price">
              <div
                class="content__right__item__right__bottom__price__promotion"
              >
                ¥{{ item.promotionPrice }}
              </div>
              <div class="content__right__item__right__bottom__price__original">
                ¥{{ item.originalPrice }}
              </div>
            </div>
            <div class="content__right__item__right__bottom__count">
              <span
                @click="
                  () => {
                    changeItemToCart(shopId, shopName, item.id, item, -1)
                  }
                "
                v-show="cartData?.[shopId]?.itemList?.[item.id]?.['count']"
                class="content__right__item__right__bottom__count__minus-iconfont"
              >
                &#xe780;
              </span>
              <span
                v-show="cartData?.[shopId]?.itemList?.[item.id]?.['count']"
                class="content__right__item__right__bottom__count__number"
              >
                {{ cartData?.[shopId]?.itemList?.[item.id]?.['count'] }}
              </span>
              <span
                @click="
                  () => {
                    changeItemToCart(shopId, shopName, item.id, item, 1)
                  }
                "
                class="content__right__item__right__bottom__count__plus-iconfont"
              >
                &#xe845;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { get } from '../../utils/request'
import { useCommonCartEffect } from '../../views/effects/commonCartEffect'

// 定义变量左侧数据
const leftItems = [
  {
    name: 'all',
    text: '全部商品'
  },
  {
    name: 'seckill',
    text: '秒杀'
  },
  {
    name: 'fruit',
    text: '新鲜水果'
  },
  {
    name: 'snacks',
    text: '休闲食品'
  },
  {
    name: 'vegetable',
    text: '时令蔬菜'
  },
  {
    name: 'meat',
    text: '肉蛋家禽'
  }
]
// 切换tab的逻辑
const useTabEffect = () => {
  const currentItemName = ref('all')
  const handleLeftItemChange = (itemName) => {
    // 点击高亮
    currentItemName.value = itemName
  }
  return { currentItemName, handleLeftItemChange }
}
// 请求内容区数据的逻辑
const useContentEffect = (currentItemName) => {
  const route = useRoute()
  const shopId = route.params.id
  // 商品数据
  const rightItems = ref([])
  const getContentData = async (shopId, currentTab) => {
    const result = await get(`/api/shop/${shopId}/tab/${currentTab}`)
    rightItems.value = result.data.data
  }
  watchEffect(() => {
    getContentData(shopId, currentItemName.value)
  })
  return { rightItems, shopId }
}
export default {
  name: 'Content',
  props: ['shopName'],
  setup () {
    const { changeItemToCart, cartData } = useCommonCartEffect()
    const { handleLeftItemChange, currentItemName } = useTabEffect()
    const { rightItems, shopId } = useContentEffect(currentItemName)
    return {
      shopId,
      leftItems,
      currentItemName,
      handleLeftItemChange,
      rightItems,
      cartData,
      changeItemToCart
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixins.scss';
.content {
  position: absolute;
  top: 146rem;
  bottom: 49rem;
  left: 0;
  right: 0;
  overflow-y: auto;
  display: flex;
  &__left {
    background-color: #f5f5f5;
    &__item {
      width: 76rem;
      height: 40rem;
      font-family: PingFangSC-Regular;
      font-size: 14rem;
      color: #333333;
      text-align: center;
      line-height: 40rem;
      &--active {
        background-color: #fff;
      }
    }
  }
  &__right {
    overflow-y: auto;
    flex-grow: 1;
    background-color: #fff;
    &__item {
      margin: 0 18rem 12rem 16rem;
      display: flex;
      border-bottom: 1rem solid #f1f1f1;
      &__left {
        margin-right: 16rem;
        &__image {
          width: 68rem;
          height: 68rem;
          margin-bottom: 12rem;
        }
      }
      &__right {
        flex-grow: 1;
        &__top {
          @include ellipsis;
          width: 181rem;
          font-family: PingFangSC-Medium;
          font-size: 14rem;
          color: #333333;
          margin-bottom: 8rem;
        }
        &__middle {
          font-family: PingFangSC-Regular;
          font-size: 12rem;
          color: #333333;
          line-height: 16rem;
          margin-bottom: 8rem;
        }
        &__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
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
                font-size: 12rem;
              }
            }
            &__original {
              font-family: PingFangSC-Regular;
              font-size: 10rem;
              color: #999999;
              line-height: 20rem;
              &::first-letter {
                font-size: 12rem;
              }
            }
          }
          &__count {
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
    }
  }
}
</style>
