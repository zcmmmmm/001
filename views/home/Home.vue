<template>
  <div>
    <div class="container">
      <Header />
      <Search />
      <Banner />
      <Nav />
      <Gap />
      <Nearby />
    </div>
    <Docker tag="home"/>
  </div>
</template>

<style lang="scss" scoped>
// src\App.vue
@import '../../style/mixins.scss';
@import '../../style/variables.scss';

.container {
  overflow-y: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 49rem;
}
</style>
<script>
import Header from './Header.vue'
import Search from './Search.vue'
import Banner from './Banner.vue'
import Nav from './Nav.vue'
import Gap from './Gap.vue'
import Nearby from './Nearby.vue'
import Docker from '../../components/Docker.vue'
export default {
  name: 'Home',
  components: { Header, Search, Banner, Nav, Gap, Nearby, Docker }
}
</script>
