<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
// Import Main styles for this application
@import "assets/scss/style";

.table {
  display: table;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
}
</style>
