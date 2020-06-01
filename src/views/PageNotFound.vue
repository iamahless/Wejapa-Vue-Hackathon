<template>
<div class="c-404">
      <div class="c-404__content">
        <h1 class="c-404__title">404</h1>
        <p class="c-404__des">Sorry, but we couldn’t find the page you are looking for, try searching for something else</p>
        
        <router-link class="c-404__link" to="/jobs"><i class="feather icon-arrow-left"></i> Return to Jobs page</router-link>
      </div>

      <span class="c-404__shape1"></span>
      <span class="c-404__shape2"></span>
    </div>
</template>

<script>
export default {
  name: 'PageNotFound',
};
</script>

<style scoped>
</style>
