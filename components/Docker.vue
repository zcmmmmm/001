<template>
  <div class="docker">
    <span
      @click="
        () => {
          dockerItemClick(item.path)
        }
      "
      v-for="item of dockerItems"
      :class="{ docker__item: true, docker__item__active: item.tag === tag }"
      :key="item.icon"
    >
      <span class="docker__item__iconfont iconfont" v-html="item.icon"></span>
      <span class="docker__item__text">{{ item.text }}</span>
    </span>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  name: 'Docker',
  props: ['tag'],
  setup () {
    const router = useRouter()
    const dockerItems = [
      { icon: '&#xe609;', text: '首页', tag: 'home', path: '/' },
      { icon: '&#xe899;', text: '购物车', tag: 'cart', path: '/' },
      { icon: '&#xe608;', text: '订单', tag: 'order', path: '/order-list' },
      { icon: '&#xe60a;', text: '我的', tag: 'user', path: '/' }
    ]
    const dockerItemClick = (path) => {
      router.push({ path: path })
    }
    return { dockerItems, dockerItemClick }
  }
}
</script>
<style lang="scss" scoped>
@import '../style/mixins.scss';
@import '../style/variables.scss';
.docker {
  width: 375rem;
  height: 49rem;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #ffffff;
  box-shadow: 0 -1rem 1rem 0 #f1f1f1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 10rem;
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $content-fontcolor;
    &__iconfont {
      font-size: 20rem;
    }
    &__text {
      margin-top: 2rem;
      font-family: PingFangSC-Regular;
      font-size: 20rem;
      transform: scale(0.5, 0.5);
      transform-origin: center top;
    }
    &__active {
      color: #1fa4fc;
    }
  }
}
</style>
