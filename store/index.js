import { createStore } from 'vuex'
// 把购物车信息放到缓存
const setLocalCartData = (state) => {
  const { cartData } = state
  // 转到JSON
  const cartDataString = JSON.stringify(cartData)
  // 存到localStorage里面
  localStorage.setItem('cartData', cartDataString)
}
// 从缓存中取出购物车数据
const getLocalCartData = () => {
  let result = {}
  if (localStorage.cartData) {
    // json字符串转对象
    result = JSON.parse(localStorage.cartData)
  }
  return result
}
export default createStore({
  state: {
    cartData: getLocalCartData()
  },
  mutations: {
    changeItemToCart (state, payload) {
      const { shopId, shopName, itemId, itemInfo, num } = payload
      // 判断有无shopId
      let shopInfo = {}
      if (state.cartData[shopId]) {
        shopInfo = state.cartData[shopId]
      } else {
        shopInfo.shopName = shopName
        shopInfo.itemList = {}
      }
      console.log(shopInfo.itemList)
      // 购物车的商品信息
      let item = null
      if (shopInfo.itemList[itemId]) {
        item = shopInfo.itemList[itemId]
      } else {
        item = itemInfo
        item.count = 0
      }
      // 改变数量
      item.count += num
      if (item.count === 0) {
        delete shopInfo.itemList[itemId]
      } else {
        // 选中状态
        item.checked = true
        shopInfo.itemList[itemId] = item
      }
      if (JSON.stringify(shopInfo.itemList) === '{}') {
        delete state.cartData[shopId]
      } else {
        state.cartData[shopId] = shopInfo
      }
      setLocalCartData(state)
    },
    changeItemChecked (state, payload) {
      const { shopId, itemId } = payload
      // 对应的商品
      const item = state.cartData[shopId].itemList[itemId]
      // 切换选中状态
      item.checked = !item.checked
      setLocalCartData(state)
    },
    clearCart (state, payload) {
      const { shopId } = payload
      state.cartData[shopId].itemList = {}
      setLocalCartData(state)
    },
    // 设置全选
    setAllChecked (state, payload) {
      const { shopId } = payload
      const shopInfo = state.cartData[shopId]
      for (const key in shopInfo.itemList) {
        shopInfo.itemList[key].checked = true
      }
      setLocalCartData(state)
    }
  },
  actions: {},
  modules: {}
})
