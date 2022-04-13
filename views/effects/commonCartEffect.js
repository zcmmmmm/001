import { useStore } from 'vuex'
import { toRefs } from 'vue'
// 购物车相关逻辑
export const useCommonCartEffect = () => {
  const store = useStore()
  const { cartData } = toRefs(store.state)
  const changeItemToCart = (shopId, shopName, itemId, itemInfo, num) => {
    store.commit('changeItemToCart', {
      shopId,
      shopName,
      itemId,
      itemInfo,
      num
    })
  }
  const changeItemChecked = (shopId, itemId) => {
    store.commit('changeItemChecked', { shopId, itemId })
  }
  const clearCart = (shopId) => {
    store.commit('clearCart', { shopId })
  }
  const setAllChecked = (shopId) => {
    store.commit('setAllChecked', { shopId })
  }
  return {
    cartData,
    changeItemToCart,
    changeItemChecked,
    clearCart,
    setAllChecked
  }
}
