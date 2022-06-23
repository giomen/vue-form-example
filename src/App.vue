<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/newuser">New User</router-link>
    </nav>
    <router-view/>
  </div>
</template>
<style lang="scss">
  @import "@owui/theme-product/theme";
#app {
  max-width: 1024px;
  margin: auto;
}
nav {
  padding: 30px;
  margin-bottom: $gutter * 3;
  border-bottom: 1px solid $neutral-low;
  display: flex;
  gap: 16px;

  a {
    @extend %Paragraph;
    color: $primary-base;
    font-weight: normal;
    text-decoration: none;

    &.router-link-exact-active {
      color: $mood-good;
      text-decoration: underline;
    }
  }
}
</style>
