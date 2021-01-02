<template>
  <div class="sign-in-sign-up">
    <router-link to="/register" tag="div" class="btn-account">
      <b>Save your content</b>
      <img src="../../assets/logo.png" alt="">
      <p>Sign up</p>
    </router-link>
    <span class="divider divider--content-center" role="separator">or</span>
    <router-link to="/login" tag="div" class="btn-account">
      <p>Log in</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'SignInSignUp'
}
</script>
