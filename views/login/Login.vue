<template>
  <div class="container">
    <div class="container__portrait">
      <img
        class="container__portrait__img"
        src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202221429453.png"
        alt=""
      />
    </div>
    <div class="container__input">
      <input
        class="container__input__item"
        type="text"
        placeholder="请输入手机号"
        v-model="phone"
      />
      <input
        class="container__input__item"
        type="password"
        placeholder="请输入密码"
        v-model="password"
      />
    </div>
    <div class="container__button">
      <button class="container__button__login" @click="handleLogin">
        登陆
      </button>
    </div>
    <div class="container__content">
      <a
        class="container__content__a"
        href="javascript:;"
        @click="handleRegister"
        >立即注册</a
      >
      <span class="container__content__gap">|</span>
      <a class="container__content__a" href="javascript:;">忘记密码</a>
    </div>
  </div>
  <Toast v-if="isShow" :message="toastMessage" />
</template>
<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request'
import Toast, { showToastEffect } from '../../components/Toast.vue'
const router = useRouter()
// 登陆相关
const userLoginEffect = (showToast) => {
  const data = reactive({
    phone: '',
    password: ''
  })

  const handleLogin = async () => {
    // 调用接口
    try {
      if (data.phone === '') {
        showToast('手机号不能为空')
        return
      }
      if (data.password === '') {
        showToast('密码不能为空')
        return
      }
      const result = await post('/api/user/login', {
        phone: data.phone,
        password: data.password
      })
      if (result.data.code === '0000') {
        localStorage.isLogin = 'true'
        // 跳转到home
        router.push({ name: 'Home' })
      } else {
        showToast(result.data.desc)
      }
    } catch (error) {
      showToast('发送请求失败!')
    }
  }
  const { phone, password } = toRefs(data)
  return {
    phone,
    password,
    handleLogin
  }
}
// 注册相关
const userRegisterEffect = () => {
  const router = useRouter()
  const handleRegister = () => {
    router.push({ name: 'Register' })
  }
  return { handleRegister }
}

export default {
  name: 'Login',
  components: { Toast },
  setup () {
    const { isShow, toastMessage, showToast } = showToastEffect()
    const { phone, password, handleLogin } = userLoginEffect(showToast)
    const { handleRegister } = userRegisterEffect()
    return {
      handleLogin,
      handleRegister,
      phone,
      password,
      isShow,
      toastMessage
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  &__portrait {
    margin-top: 120rem;
    margin-bottom: 40rem;
    text-align: center;
    &__img {
      width: 66rem;
      height: 66rem;
    }
  }
  &__input {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 16rem;
    &__item {
      width: 295rem;
      height: 48rem;
      background: #f9f9f9;
      border: 1rem solid rgba(0, 0, 0, 0.1);
      border-radius: 6rem;
      margin-bottom: 16rem;
      box-sizing: border-box;
      font-family: PingFangSC-Regular;
      font-size: 16rem;
      color: rgba(0, 0, 0, 0.5);
      letter-spacing: 0;
      line-height: 24rem;
      padding-left: 16rem;
    }
  }
  &__button {
    text-align: center;
    margin-bottom: 16rem;
    &__login {
      width: 295rem;
      height: 48rem;
      background: #0091ff;
      box-shadow: 0 4rem 8rem 0 rgba(0, 145, 255, 0.32);
      border-radius: 4rem;
      border: none;
      font-family: PingFangSC-Regular;
      font-size: 16rem;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
      line-height: 24rem;
    }
  }
  &__content {
    margin: 0 auto;
    width: 139rem;
    height: 20rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__a,
    &__gap {
      font-family: PingFangSC-Regular;
      font-size: 14rem;
      color: rgba(0, 0, 0, 0.5);
      letter-spacing: 0;
      text-decoration: none;
      -webkit-tap-highlight-color: transparent;
    }
  }
}
</style>
