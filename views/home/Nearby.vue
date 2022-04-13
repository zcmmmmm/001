<template>
  <div class="container__nearby">
    <div class="container__nearby__title">附近店铺</div>
    <router-link
      :to="`/shop/${item.id}`"
      v-for="item of nearbyItems"
      :key="item.id"
    >
      <ShopInfo :item="item" :showBorder="true" />
    </router-link>
  </div>
  <Toast v-if="isShow" :message="toastMessage" />
</template>
<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import Toast, { showToastEffect } from '../../components/Toast.vue'
import ShopInfo from '../../components/ShopInfo.vue'

const useNearbyEffect = (showToast) => {
  const nearbyItems = ref([])
  const getNearbyItems = async () => {
    // 调用接口
    try {
      const result = await get('/api/home/nearby')
      if (result.data.code === '0000') {
        nearbyItems.value = result.data.data
      } else {
        showToast('数据为空...')
      }
    } catch (error) {
      showToast('获取数据失败!')
    }
  }
  getNearbyItems()
  return { nearbyItems }
}

export default {
  name: 'Nearby',
  components: { Toast, ShopInfo },
  setup () {
    const { isShow, toastMessage, showToast } = showToastEffect()
    const { nearbyItems } = useNearbyEffect(showToast)
    return {
      isShow,
      toastMessage,
      nearbyItems
    }
  }
}
</script>
<style lang="scss" scoped>
.container__nearby {
  padding: 16rem 18rem;
  &__title {
    font-family: PingFangSC-Medium;
    font-size: 18rem;
    color: #333333;
    margin-bottom: 14rem;
  }
  a {
    text-decoration: none;
  }
}
</style>
